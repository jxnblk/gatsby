module.exports = {
  __experimentalThemes: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
    {
      resolve: `gatsby-theme-notes`,
      options: {
        mdx: false,
        rootPath: `/notes`,
        homeText: `Home`,
      },
    },
  ],
  siteMetadata: {
    title: `Shadowed Site Title`,
  },
}
