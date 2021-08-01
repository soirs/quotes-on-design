module.exports = {
  siteMetadata: {
    title: 'Quote Generator by Frank Semakula',
    description: 'Quote generator made from Gatsby, SCSS, QuotesOnDesign API and FontAwesome',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Quote Generator by FRS',
        short_name: 'FRS - Quote Generator',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png', // This path is relative to the root of the site.
      },
    },
  ],
};
