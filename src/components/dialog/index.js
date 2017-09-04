import { h, Component } from 'preact'
import request from '../../services/request'
import css from './style.css'

const getData = url => fetch(url).then(response => response.json())

export default class Dialog extends Component {
  state = {}

  keyPressEvent = null

  closeDialog = event => this.props.closeRepo(this.props.repo.id)

  fetchRepo = async () => {
    console.log('fetch repos: ', this.props)
    const { matches: { name, repoName } } = this.props
    const { body } = await request(`//api.github.com/repos/${name}/${repoName}`)
    this.getInfo(body)
  }

  getInfo = repo => {
    const urls = [
      repo.url + '/contributors?per_page=3',
      repo.languages_url,
      repo.url + '/pulls?state=open&sort=popularity&direction=desc&per_page=5'
    ]

    // fetch repo data
    Promise.all(urls.map(getData)).then(([contributors, languages, pulls]) => {
      this.setState({ contributors, languages, pulls })
    })

    this.keyPressEvent = document.addEventListener('keydown', event => {
      event.key === 'Escape' && this.closeDialog()
    })
  }

  componentWillMount() {
    this.fetchRepo()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPressEvent)
  }

  render() {
    const { repo } = this.props
    const { contributors, pulls } = this.state
    return (
      <div class={css.dialogWrapper}>
        <div class={css.backcover} onClick={this.closeDialog} />
        <div class={css.dialog}>
          <button class={css.closeBtn} onClick={this.closeDialog}>
            X
          </button>
          <h3 class={css.header}>
            {repo && repo.full_name}
          </h3>
          <div>
            <h4>Contributors</h4>
            {contributors &&
              contributors.map(({ login, url, contributions }) =>
                <div>
                  <a href={url}>
                    {login}
                  </a>
                  <span>
                    Contributions: {contributions}
                  </span>
                </div>
              )}
          </div>
          <div>
            <h4>Pull Requests</h4>
            {pulls &&
              pulls.map(({ title, url }) =>
                <div>
                  <a href={url}>
                    {title}
                  </a>
                </div>
              )}
          </div>
        </div>
      </div>
    )
  }
}
