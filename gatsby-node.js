const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const authorsTemplate = path.resolve('./src/templates/authors.js')
  const authorTemplate = path.resolve('./src/templates/author.js')
  const tagTemplate = path.resolve('./src/templates/tags.js')

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                authorId
              }
              frontmatter {
                title
                category
                tags
                draft
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    createPage({
      path: `/authors/`,
      component: authorsTemplate,
    })


    const tags = result.data.tagsGroup.group
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category,
    )
    const authorSet = new Set()

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      if (post.node.fields.authorId) {
        authorSet.add(post.node.fields.authorId)
      }

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    const authorList = Array.from(authorSet)
    authorList.forEach(authorId => {
      createPage({
        path: `/author/${authorId}/`,
        component: authorTemplate,
        context: {
          authorId,
        },
      })
    })
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'author')) {
      createNodeField({
        node,
        name: 'authorId',
        value: node.frontmatter.author,
      })
    }
  }


}
