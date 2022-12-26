export const manufacturersFragment = `
id
_id
importId
code
isTop
isShowHomepage
enabled
translations {
  edges {
    node {
      name
      description
      locale
    }
  }
}
`;
