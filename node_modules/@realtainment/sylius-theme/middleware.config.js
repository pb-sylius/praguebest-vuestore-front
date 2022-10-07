module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'http://sylius-server.test/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'http://sylius-server.test/media/cache/sylius_shop_product_thumbnail',
          regular: 'http://sylius-server.test/media/cache/sylius_shop_product_large_thumbnail'
        },
        customHeaders: {}
      }
    }
  }
};
