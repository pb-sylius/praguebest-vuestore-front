const lruCache = require('stale-lru-cache');

module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'http://sylius.test/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'http://sylius.test',
          regular: 'http://sylius.test'
        },
        lruCache: new lruCache(),
        customHeaders: {}
      },
    }
  }
};
