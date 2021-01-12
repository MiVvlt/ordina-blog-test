import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { PostDate } from '../components/post-date'
import { PostContainer } from '../components/post-container'
import { SocialShare } from '../components/social-share'
import { Bio } from '../components/bio'
import { PostNavigator } from '../components/post-navigator'
import { Disqus } from '../components/disqus'
import { Utterances } from '../components/utterances'
import * as ScrollManager from '../utils/scroll'
import '../styles/code.scss'
import 'katex/dist/katex.min.css'
import { TagsContainer } from '../components/tags-container/tags-container'
import { PostHeaderImage } from '../components/post-header-image/post-header-image'

export default ({ data, pageContext, location }) => {
  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl } = metaData
  const { disqusShortName, utterances } = comment
  const { title: postTitle, date, author, tags, image } = post.frontmatter

  return (
    <Layout location={location}
            title={title}>
      <Head title={postTitle}
            description={post.excerpt} />
      <PostHeaderImage image={image} title={postTitle} />
      <PostDate date={date} />
      <PostTitle title={postTitle} />
      <TagsContainer tags={tags} />
      <PostContainer html={post.html} />
      <SocialShare title={postTitle}
                   author={author} />
      <Elements.Hr />
      <Bio author={author}
           isPost={true} />
      <PostNavigator pageContext={pageContext} />
      {!!disqusShortName && (
        <Disqus
          post={post}
          shortName={disqusShortName}
          siteUrl={siteUrl}
          slug={pageContext.slug}
        />
      )}
      {!!utterances && <Utterances repo={utterances} />}
    </Layout>
  )
}

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                siteUrl
                comment {
                    disqusShortName
                    utterances
                }
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 280)
            html
            frontmatter {
                title
                tags
                image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                author {
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
                }
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`
