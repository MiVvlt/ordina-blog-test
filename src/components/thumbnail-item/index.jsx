import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'
import Image from 'gatsby-image'

export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <Image
        className="post-tumbnail-image"
        fluid={node.frontmatter.image.childImageSharp.fluid}
        alt={node.frontmatter.title}
      />
      <h3>{node.frontmatter.title || node.fields.slug}</h3>
      <div className='post-tumbnail-subtitle'>
        <Link to={'/author/' + node.frontmatter.author.id}><small>Written by {node.frontmatter.author.name}</small></Link>
        <small>{node.frontmatter.date}</small>
      </div>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link>
)
