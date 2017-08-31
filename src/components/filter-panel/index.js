import { h, Component } from 'preact'

export default class FilterPanel extends Component {
	handleSubmit = event => {
		event.preventDefault()
	}
	changeFilter = type => event => {
		this.props.changeFilter({ type, value: event.target.checked })
	}

	changeStars = type => event => {
		this.props.changeFilter({ type, value: event.target.value })
	}

	changeDate = type => event => {
		this.props.changeFilter({ type, value: event.target.value })
	}

	filterLanguage = event => {
		event.preventDefault()
		this.props.changeFilter({ type: 'language', value: event.target.value })
	}

	changeType = event => {
		this.props.changeFilter({ type: 'type', value: event.target.value })
	}

	render({ filters, languages }) {
		return (
			<div>
				<h4>Filters: </h4>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							type="checkbox"
							id="hasOpenIssues"
							checked={filters.hasOpenIssues}
							onClick={this.changeFilter('hasOpenIssues')}
							name="issues"
							value="issues"
						/>
						<label for="hasOpenIssues">Has open issues</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="hasTopics"
							checked={filters.hasTopics}
							onClick={this.changeFilter('hasTopics')}
							name="topics"
							value="topics"
						/>
						<label for="hasTopics">Has topics</label>
					</div>
					<div>
						<input
							type="number"
							id="stars"
							value={filters.stars}
							onChange={this.changeStars('stars')}
						/>
						<label for="stars">Stars</label>
					</div>
					<div>
						<input
							type="date"
							id="lastUpdated"
							value={filters.updated}
							onChange={this.changeDate('updated')}
						/>
						<label for="lastUpdated">Updated</label>
					</div>
					<fieldset>
						<label>Types</label>
						<input
							type="checkbox"
							id="allTypes"
							checked={filters.type === 'all'}
							onClick={this.changeType}
							name="all types"
							value="all"
						/>
						<label for="allTypes">All</label>
						<input
							type="checkbox"
							id="forks"
							checked={filters.type === 'forks'}
							onClick={this.changeType}
							name="forks"
							value="forks"
						/>
						<label for="forks">Forks</label>
						<input
							type="checkbox"
							id="sources"
							checked={filters.type === 'sources'}
							onClick={this.changeType}
							name="sources"
							value="sources"
						/>
						<label for="sources">Sources</label>
					</fieldset>
					<div>
						<select
							name="languages"
							id="languages"
							onChange={this.filterLanguage}
						>
							<option value="all">All</option>
							{languages.map(language =>
								<option value={language}>
									{language}
								</option>
							)}
						</select>
						<label for="languages">Languages</label>
					</div>
				</form>
			</div>
		)
	}
}
