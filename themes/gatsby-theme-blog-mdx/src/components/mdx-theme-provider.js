import React from "react"
import { ComponentProvider } from "theme-ui"

import theme from "../tokens"
import mdxComponents from "./mdx"

export default ({ children }) => (
  <ComponentProvider components={mdxComponents} theme={theme}>
    {children}
  </ComponentProvider>
)
