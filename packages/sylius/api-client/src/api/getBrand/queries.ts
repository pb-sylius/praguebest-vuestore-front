import gql from 'graphql-tag';
import { brandsFragment, imagesFragment } from './fragments';

export const queryAll = gql`
  query getBrandsAll(
    $itemsPerPage: Int,
    $page: Int,
    $localeCode: String
  ) {
    brands(
      page: $page,
      itemsPerPage: $itemsPerPage,
      localeCode: $localeCode
    ) {
      collection {
        id
        code
        isTop
        isShowHomepage
        name
        slug
        ${imagesFragment}
      }
    }
  }
`;

/* graph ql neumoznuje poslat promenne do fragmentu,
takze pro product nemuzeme pouzit fragment */
export const queryOne = gql`
  query getBrandsOne(
    $slug: String
    $productsItemsPerPage: Int
    $page: Int
  ) {
    brands(
      slug: $slug
    ) {
      collection {
        id
        slug
        name
        description
        ${imagesFragment}
        products(itemsPerPage: $productsItemsPerPage, page: $page) {
          paginationInfo {
            itemsPerPage
            lastPage
            totalCount
          }
          collection {
            name
            averageRating
            slug
            code
            _id
            images {
              collection {
                path
              }
            }
            variants {
              collection {
                channelPricings {
                  collection {
                    channelCode
                    price
                  }
                }
                optionValues {
                  edges {
                    node {
                      id
                      code
                      value
                      option {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const querySearch = gql`
  query getBrandsAll(
    $search: String
    $itemsPerPage: Int,
    $page: Int,
  ) {
    brands(
      page: $page,
      itemsPerPage: $itemsPerPage,
      translations_name: $search
    ) {
      collection {
        ${brandsFragment}
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`;
