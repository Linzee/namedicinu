const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

let { spaceId, accessToken, locale } = process.env;

if (!locale) {
  locale = "sk";
}

console.log(`Using locale ${locale}`);

module.exports = {
  siteMetadata: {
    title: `Na medicinu`,
    description: `Course site`,
    author: `Dominik Gmiterko <d.gmiterko@gmail.com>`,
    siteUrl: locale == "sk" ? `https://namedicinu.sk/` : `https://namedicinu.cz/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        smartypants: true
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Na medicínu`,
        short_name: `Na medicínu`,
        start_url: `/`,
        background_color: `#fcf2e4`,
        theme_color: `#ffc250`,
        display: `minimal-ui`,
        icon: `src/images/fev_icon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          locale: locale
        }
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges.map(edge => {
            return {
              url: `${site.siteMetadata.siteUrl}${edge.node.path}`,
              changefreq: `monthly`,
              priority: 0.5,
            }
          })
        },
      }
    }
  ],
}
