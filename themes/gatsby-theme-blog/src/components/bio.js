/** @jsx jsx */
/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { jsx, Styled, Flex } from "theme-ui"
import BioContent from "./bio-content.js"

const Bio = () => {
  const data = useStaticQuery(bioQuery)
  const {
    site: {
      siteMetadata: { author },
    },
    avatar,
  } = data

  return (
    <Flex sx={{ mb: 4 }}>
      {avatar ? (
        <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
          sx={{
            mr: 2,
            mb: 0,
            width: 48,
            borderRadius: 99999,
          }}
        />
      ) : (
        <div
          sx={{
            mr: 2,
            mb: 0,
            width: 48,
            borderRadius: 99999,
          }}
          role="presentation"
        />
      )}
      <Styled.p>
        <BioContent />
      </Styled.p>
    </Flex>
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
    avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio
