/** @jsx jsx */
import { Link } from "gatsby"
import { Fragment } from "react"
import { jsx, Styled } from "theme-ui"

import useOptions from "../use-options"
import BreadcrumbDivider from "./breadcrumb-divider"
import BreadcrumbHome from "./breadcrumb-home"

export default ({ links }) => {
  const { basePath = `/`, homeText, breadcrumbSeparator } = useOptions()

  return (
    <nav
      sx={{
        mb: 3,
        "& a": {
          textDecoration: `none`,
          fontWeight: `bold`,
        },
      }}
    >
      <BreadcrumbHome text={homeText} />
      <BreadcrumbDivider text={breadcrumbSeparator} />

      <Styled.a as={Link} to={basePath}>
        {basePath.replace(/^\//, ``)}
      </Styled.a>
      {links.map(link => (
        <Fragment>
          <BreadcrumbDivider text={breadcrumbSeparator} />
          <Styled.a as={Link} to={link.url} key={link.url}>
            {link.name}
          </Styled.a>
        </Fragment>
      ))}
    </nav>
  )
}
