module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'http://serve-sylius.test/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'http://serve-sylius.test',
          regular: 'http://serve-sylius.test'
        },
        customHeaders: {}
      }
    }
  }
};
