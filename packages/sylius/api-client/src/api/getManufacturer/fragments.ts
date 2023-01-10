export const manufacturersFragment = `
id
code
isTop
isShowHomepage
name
slug
images {
  edges {
    node {
      path
    }
  }
}
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

export const imagesFragment = `
images {
  edges {
    node {
      id
      path
    }
  }
}
`;
