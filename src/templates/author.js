// templates/Author/index.jsx
import React from 'react'
import { Bio } from '../components/bio'
import { Layout } from '../layout'
import { graphql } from 'gatsby'

export default ({
                  data: {
                    site: { siteMetadata },
                    authorYaml,
                    allMarkdownRemark: { edges: postNodes },
                  },
                  location,
                }) => {

  const { title } = siteMetadata
  return (

    <Layout location={location}
            title={title}>
      <Bio author={authorYaml} />
      {postNodes.map(({ node: post }, idx) => (
        <div key={post.id}>
          <a href={post.fields.slug}>{post.frontmatter.title}</a>
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
    query PostsByAuthorId($authorId: String!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            filter:
            {
                fields: {
                    authorIds: {
                        eq: $authorId
                    }
                }
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        authors {
                            id
                        }
                    }
                    fields {
                        authorIds
                        slug
                    }
                }
            }
        }
        authorYaml(id: { eq: $authorId }) {
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
`
