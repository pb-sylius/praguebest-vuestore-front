
const path = require('path');

module.exports = {
  "stories": [
    "../packages/sylius/theme/ui/components/**/*.stories.mdx",
    "../packages/sylius/theme/ui/components/**/*.stories.@(js|jsx|ts|tsx|vue)"
  ],
  "addons": [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-controls",
    //"@storybook/addon-actions",
    "@storybook/addon-backgrounds",
    "@storybook/addon-viewport",
    "@storybook/addon-toolbars",
    "@storybook/addon-measure",
    "@storybook/addon-outline",
    "@storybook/addon-interactions",
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
        rule: {
          test: /\.(scss|sass)$/i,
        },
      },
    },
  ],
  "framework": "@storybook/vue",
  webpackFinal: async (config) => {
    config.resolve.extensions = ['.mjs', '.ts', '.tsx', ...config.resolve.extensions];
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ];
    config.module.rules.push({
      resourceQuery: /blockType=include-source/,
      loader: path.resolve(__dirname, '../packages/sylius/theme/ui/utilities/source-loader.js'),
    });

    return config;
  },
}