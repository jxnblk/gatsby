/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, Styled, Flex } from "theme-ui"

import Bio from "../components/bio"

const Footer = ({ previous, next }) => (
  <footer
    sx={{
      mt: 4,
      pt: 3,
    }}
  >
    <Styled.hr />
    <Bio />
    {(previous || next) && (
      <Flex
        as="ul"
        sx={{
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Styled.a as={Link} to={previous.node.slug} rel="prev">
              ← {previous.node.title}
            </Styled.a>
          )}
        </li>
        <li>
          {next && (
            <Styled.a as={Link} to={next.node.slug} rel="next">
              {next.node.title} →
            </Styled.a>
          )}
        </li>
      </Flex>
    )}
  </footer>
)

export default Footer
