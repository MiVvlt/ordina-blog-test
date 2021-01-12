import React, { Component } from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div className={'search-bar'}>
        <input type='text'
               placeholder={'Search'}
               value={this.state.query}
               onChange={this.search} />
        {this.state.query && (<ul className={'search-results'}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={page.path}>{page.title}</Link>
              <div className={'search-results-tags'}>{page.tags.join(`,`)}</div>
            </li>
          ))}
        </ul>)}
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
      .search(query, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
