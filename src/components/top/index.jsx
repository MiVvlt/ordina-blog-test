import React from 'react'
import { Link } from 'gatsby'
import Search from "../search/search.js"
import { StaticQuery, graphql } from "gatsby"

import './index.scss'

export const Top = ({ title }) => {
  return (
    <StaticQuery
      query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
      render={data => (
        <header className='top'>

          <Link to={`/`}
                className='brand'>
            {title}
          </Link>

          <Link to={`/authors`}
                className='link'>
            Authors
          </Link>

          <Search searchIndex={data.siteSearchIndex.index} />

        </header>
      )}
    />
  )
}
