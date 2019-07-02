import React from "react"
import { Global } from "@emotion/core"
import { css } from "theme-ui"
import { Layout, Main, Container } from "theme-ui"

export default props => (
  <>
    <Global
      styles={css({
        "*": {
          boxSizing: `border-box`,
        },
        body: {
          margin: 0,
        },
      })}
    />
    <Layout>
      <Main>
        <Container>{props.children}</Container>
      </Main>
    </Layout>
  </>
)
