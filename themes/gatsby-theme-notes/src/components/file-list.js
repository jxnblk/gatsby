/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default ({ files }) => (
  <ul sx={{ padding: 0 }}>
    {files.map(url => (
      <li key={url}>
        <Styled.a as={Link} to={url}>
          {url}
        </Styled.a>
      </li>
    ))}
  </ul>
)
