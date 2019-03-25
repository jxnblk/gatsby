---
title: Building a Gatsby theme with Emotion
date: 2019-03-25
author: Brent Jackson
excerpt: "How to get started building your own Gatsby theme with Emotion"
tags:
  - themes
  - css
  - styling
---

Gatsby [themes][themes-tag] are a new way to share functionality across multiple Gatsby sites.
[Emotion][] is a CSS-in-JS library, with support for theming with React context and a very similar API to Styled Components.
Libraries like Emotion are a great fit for Gatsby themes.
They can help theme authors encapsulate styles and avoid unintended styling issues for end users.
We'll walk through how to build a Gatsby theme with configurable styles powered by Emotion.
If you're new to Emotion, be sure to check out the [Emotion docs][emotion] for more information on usage,
and to learn more about Gatsby themes, you can [read more on our blog][themes-tag].
This tutorial also uses [Yarn][] so be sure to install that before proceeding.

## Initial setup

To create a new setup for developing this theme, you'll be using [gatsby-starter-theme][].
In your terminal run the following to get started:

```shell
npx gatsby new my-gatsby-theme https://github.com/ChristopherBiscardi/gatsby-starter-theme
```

This will create a new directory with [Yarn workspaces][] preconfigured for developing a Gatsby theme.
Switch to the `my-gatsby-theme` directory created by this command.
Next, you'll want to rename the theme itself.

Start by renaming the `gatsby-theme-minimal` directory.
By convention, Gatsby themes start with the prefix `gatsby-theme-`.
For the purposes of this tutorial, use `gatsby-theme-example-emotion`.
You'll also need to rename the theme in these files:
the root project's `package.json`,
`gatsby-theme-example/emotion/package.json`,
`gatsby-theme-example-emotion/README.md`,
`example/package.json`,
and `example/gatsby-config.js`.

## Install dependencies

Once you've given your new theme a name,
install the dependencies for all workspaces by running `yarn` in the root directory.
Next, switch to the `gatsby-theme-example-emotion` directory and install the following dependencies:

```shell
yarn add gatsby-plugin-compile-es6-packages @emotion/core @emotion/styled emotion-theming gatsby-plugin-emotion
```

Add these plugins to your theme's `gatsby-config.js`:

```js:title=gatsby-theme-example-emotion/gatsby-config.js
module.exports = {
  plugins: [
    "gatsby-plugin-emotion",
    // Note: This is only needed temporarily. Themes will automatically be transpiled in later versions.
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["gatsby-theme-example-emotion"],
      },
    },
  ],
}
```

## Adding a ThemeProvider

Emotion supports its own mechanism of _theming_ (not to be confused with Gatsby themes) using React context with the [emotion-theming][] package.
You'll be adding a `ThemeProvider` component using Gatsby's `wrapRootElement` API in your theme.
This is to allow your theme's colors and base typography to be used throughout an entire Gatsby site.
This could be useful if you intended to build a theme for sharing across an entire organization.

First, create a `gatsby-theme-example-emotion/src/` directory, where all the theme's components and modules will live.
Next, create a module for the theme's custom `ThemeProvider`.
Feel free to use any colors and fonts you like here.

```jsx:title=gatsby-theme-example-emotion/src/theme-provider.js
import React from "react"
import { ThemeProvider } from "emotion-theming"

const theme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
}

export default props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)
```

This `ThemeProvider` component can now be used with Gatsby's `wrapRootElement` to add the context to an entire Gatsby site.
Create a `gatsby-theme-example-emotion/gatsby-browser.js` file and add the `ThemeProvider` component.

```jsx:title=gatsby-theme-example-emotion/gatsby-browser.js
import React from "react"
import ThemeProvider from "./src/theme-provider"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
```

You'll also want to create a `gatsby-ssr.js` file with the same contents.

```jsx:title=gatsby-theme-example-emotion/gatsby-ssr.js
import React from "react"
import ThemeProvider from "./src/theme-provider"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
```

## Create a layout

Next, you'll add a layout component that can be imported from the theme and used in any page in the consuming Gatsby site.
Use the `@emotion/styled` package in this component to pick up values from the theme context added earlier.

```jsx:title=gatsby-theme-example-emotion/src/layout.js
import React from "react"
import styled from "@emotion/styled"

const Root = styled.div(props => ({
  fontFamily: props.theme.fonts.body,
  color: props.theme.colors.text,
  backgroundColor: props.theme.colors.background,
  "& a": {
    color: props.theme.colors.primary,
  },
}))

const Main = styled.div({
  maxWidth: 1024,
  minHeight: "100vh",
  padding: 32,
  marginLeft: "auto",
  marginRight: "auto",
})

export default props => (
  <Root>
    <Main>{props.children}</Main>
  </Root>
)
```

To expose this component as part of the theme's public API, export it from the theme's `index.js` module.

```js:title=gatsby-theme-example-emotion/index.js
export { default as Layout } from "./src/layout"
```

## Trying the theme out

Next, take advantage of the Yarn workspaces setup to install and use the theme in the `example/` site.
Switch to the `example/` directory and run the following to start the development server.
Note, you should have already added the theme as a dependency and configured the theme earlier in this post.

```shell
yarn develop
```

Open the index page in `src/pages/index.js` and import the layout component from the theme.

```js:title=example/src/pages/index.js
import React from "react"
import { Layout } from "gatsby-theme-example-emotion"

export default props => (
  <Layout>
    <h1>Hello, Emotion!</h1>
  </Layout>
)
```

Open the development server in your browser: <http://localhost:8000>.
You should see your layout with the base styles applied.

## Make it "themeable"

So far, this theme will apply a few default styles to a Gatsby site,
which limits its reusability.
To add some basic style configuration options, you can take advantage of the _shadowing_ feature in Gatsby themes.
Shadowing allows the consuming Gatsby site to override components and modules in a Gatsby theme.

Create a new `src/colors.js` file in the theme that will be a placeholder for shadowing.

```js:title=gatsby-theme-example-emotion/src/colors.js
export default {}
```

In the theme's `ThemeProvider` component, import the placeholder colors module and merge it with the defaults.

```jsx:title=gatsby-theme-example-emotion/src/theme-provider.js
import React from "react"
import { ThemeProvider } from "emotion-theming"
import userColors from "./colors" // highlight-line

const theme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    // these colors will override the defaults listed above
    ...userColors, // highlight-line
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
}

export default props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)
```

Back in the example site's directory, add a new directory with the exact same name as the theme.
Any file you add to this folder will _shadow_ a file in the theme's `src/` directory.

```shell
mkdir src/gatsby-theme-example-emotion
```

Create a new `colors.js` file in this directory and add custom colors.

```js:title=example/src/gatsby-theme-example-emotion/colors.js
export default {
  text: "tomato",
  background: "black",
  primary: "cyan",
}
```

In order to see the shadowed file in effect, be sure to stop and restart the Gatsby development server.
Open the example site in your browser to see the customized colors.
At this point, you should be able edit the example site's `colors.js` module to see changes update live.

## Publish your theme

If you've made it this far and want to share your new Gatsby theme with the world, you'll want to publish the theme to npm.
If you haven't published a package to npm before, check out...

Before you publish, be sure to update the theme's `README.md` to add usage documentation so that people installing your theme know how to use it.
Once that's in good shape, change to the theme directory and run

```shell
npm publish
```

That's it!
Hopefully by now you have a shareable theme that can be installed and used in any Gatsby site.
You can continue to expand on your theme and its layout on your own and keep an eye out for more posts on themes coming soon.

[themes-tag]: /blog/tags/themes
[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
[emotion]: https://emotion.sh
[emotion-theming]: https://emotion.sh/docs/theming
[gatsby-starter-theme]: https://github.com/ChristopherBiscardi/gatsby-starter-theme
