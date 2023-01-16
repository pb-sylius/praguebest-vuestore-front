const lruCache = require('stale-lru-cache');


module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: process.env.api || 'http://sylius.test/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: process.env.imagePathsThumbnail || 'http://sylius.test',
          regular: process.env.imagePathsRegular || 'http://sylius.test',
        },
        lruCache: new lruCache(),
        customHeaders: {}
      },
    }
  }
};
