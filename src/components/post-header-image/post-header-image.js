import React from 'react'
import './index.scss'
import Image from 'gatsby-image'

export const PostHeaderImage = ({ image, title }) => {
  return (
    <div className={'post-header-image-container'}>
      <Image className="post-header-image"
             alt={title}
             fluid={image.childImageSharp.fluid} />
    </div>
  )
}
