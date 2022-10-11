import "../packages/sylius/theme/ui/styles.scss"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Components', ['Atoms', 'Molecules', 'Organisms', 'Templates'], 'Utils', 'Integrations'],
    },
  },
}