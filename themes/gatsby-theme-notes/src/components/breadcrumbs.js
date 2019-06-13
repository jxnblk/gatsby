import React from "react"
import { Link } from "gatsby"
import { Styled, css } from "theme-ui"

import useOptions from "../use-options"
import BreadcrumbDivider from "./breadcrumb-divider"
import BreadcrumbHome from "./breadcrumb-home"

export default ({ links }) => {
  const { rootPath, homeText, breadcrumbSeparator } = useOptions()

  return (
    <nav
      css={css({
        mb: 3,
        "& a": {
          textDecoration: `none`,
          fontWeight: `bold`,
        },
      })}
    >
      <BreadcrumbHome text={homeText} />
      <BreadcrumbDivider text={breadcrumbSeparator} />

      <Styled.a as={Link} to={rootPath}>
        {rootPath.replace(/^\//, ``)}
      </Styled.a>
      {links.map(link => (
        <>
          <BreadcrumbDivider text={breadcrumbSeparator} />
          <Styled.a as={Link} to={link.url} key={link.url}>
            {link.name}
          </Styled.a>
        </>
      ))}
    </nav>
  )
}
