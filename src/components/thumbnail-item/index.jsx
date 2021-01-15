import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'
import Image from 'gatsby-image'

export const ThumbnailItem = ({ node }) => (
  <div className={`thumbnail ${TARGET_CLASS}`}>
    <div key={node.fields.slug}>
      <Link to={node.fields.slug}>
        <Image
          className='post-tumbnail-image'
          fluid={node.frontmatter.image.childImageSharp.fluid}
          alt={node.frontmatter.title}
        />
        <h3>{node.frontmatter.title || node.fields.slug}</h3>
      </Link>
      <div className='post-tumbnail-subtitle'>
        <small>Written by &nbsp;
          {!!node.frontmatter.authors && node.frontmatter.authors.map((author) => {
            console.log(author)
            return (
              <Link to={'/author/' + author.id} key={author.id}>
                {author.name}  &nbsp;
              </Link>
            )
          })}
        </small>
        <small>{node.frontmatter.date}</small>
      </div>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </div>

)
