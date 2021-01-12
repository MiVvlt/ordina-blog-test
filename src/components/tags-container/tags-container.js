import React from 'react'
import './index.scss'
import Link from 'gatsby-link'
import * as _ from 'lodash'

export const TagsContainer = ({ tags }) => {
  return (
    <div>
      <div className={'tags-list'}>
        {tags.map((tag, index) => (

          <div className={'tags-list-item'}
               key={`tag-${tag}`}>
            <small><Link to={'/tags/' + _.kebabCase(tag)}>{tag}</Link></small>
          </div>
        ))}
      </div>
    </div>
  )
}
