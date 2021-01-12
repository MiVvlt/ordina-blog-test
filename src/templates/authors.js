import React from 'react'
import { Bio } from '../components/bio'
import { Layout } from '../layout'
import { graphql } from 'gatsby'

export default ({
                  data: {
                    allAuthorYaml: { edges: authorNodes },
                    site: {siteMetadata},
                  },
                  location,
                }) => {
  const { title } = siteMetadata

  return (
    <Layout location={location}
            title={title}>
      <h2>Authors</h2>
      {authorNodes.map(({ node: author }, index) => (
        <div key={`author-${author.id}`}>
          <Bio author={author} />
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
    query AuthorsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allAuthorYaml {
            edges {
                node {
                    id
                    name
                    bio
                    profilepicture {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    twitter
                    linkedin
                    email
                    phone
                }
            }
        }
    }
`
