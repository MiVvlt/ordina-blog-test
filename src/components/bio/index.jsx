import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const Bio = ({  author, isPost  }) => (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <Image
                className="author-image"
                fluid={author.profilepicture.childImageSharp.fluid}
                alt={author.name}
                style={{
                  borderRadius: `100%`,
                }}
              />
              <div className="author-name">
                {isPost && (<span className="author-name-prefix">Written by</span>)}
                <Link to={`/author/${author.id}`} className="author-name-content">
                  <span>@{author.name}</span>
                </Link>
                <div className="author-introduction">{author.bio}</div>
                <p className="author-socials">
                  {author.email && (
                    <a href={`mailto:${author.email}`}>Email</a>
                  )}
                  {author.github && (
                    <a href={`https://github.com/${author.github}`}>GitHub</a>
                  )}
                  {author.twitter && (
                    <a href={`https://twitter.com/${author.twitter}`}>
                      Twitter
                    </a>
                  )}
                  {author.linkedin && (
                    <a href={`https://www.linkedin.com/in/${author.linkedin}/`}>
                      LinkedIn
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
)

export default Bio
