export const manufacturersFragment = `
id
_id
importId
code
isTop
isShowHomepage
enabled
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

export const productsFragment = `
products {
  collection {
    name
    slug
    reviews {
      collection {
        rating
      }
    }
    images {
      collection {
        path
      }
    }
  }
}
`;
