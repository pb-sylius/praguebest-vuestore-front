import gql from 'graphql-tag';
import { manufacturersFragment, imagesFragment } from './fragments';

export const queryAll = gql`
  query getManufacturersAll(
    $itemsPerPage: Int,
    $page: Int,
    $localeCode: String
  ) {
    manufacturers(
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
  query getManufacturersOne(
    $slug: String
    $productsItemsPerPage: Int
    $page: Int
  ) {
    manufacturers(
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
  query getManufacturersAll(
    $search: String
    $itemsPerPage: Int,
    $page: Int,
  ) {
    manufacturers(
      page: $page,
      itemsPerPage: $itemsPerPage,
      translations_name: $search
    ) {
      collection {
        ${manufacturersFragment}
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`;
