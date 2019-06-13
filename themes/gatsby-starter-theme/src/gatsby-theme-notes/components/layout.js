import React from 'react'
import { css, Layout, Main, Container } from 'theme-ui'

export default props =>
  <Layout>
    <Main>
      <Container>
        {props.children}
      </Container>
    </Main>
  </Layout>
