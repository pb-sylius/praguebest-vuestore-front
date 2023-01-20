export const brandsFragment = `
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
imageRefs: images {
  edges {
    node {
      path
    }
  }
}
`;
