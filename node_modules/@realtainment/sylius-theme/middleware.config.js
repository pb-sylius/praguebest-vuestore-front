module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'http://sylius-server.test/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'http://sylius-server.test',
          regular: 'http://sylius-server.test'
        },
        customHeaders: {}
      }
    }
  }
};
