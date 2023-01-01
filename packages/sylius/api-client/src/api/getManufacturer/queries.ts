import gql from 'graphql-tag';
import { manufacturersFragment, imagesFragment, productsFragment } from './fragments';

export const queryAll = gql`
  query getManufacturersAll(
    $itemsPerPage: Int,
    $page: Int,
  ) {
    manufacturers(
      page: $page,
      itemsPerPage: $itemsPerPage
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

/* will be replaced with translation_slug */
export const queryOne = gql`
  query getManufacturersOne(
    $id: ID!
  ) {
    manufacturer(
      id: $id
    ) {
      name
      description
      ${imagesFragment}
      ${productsFragment}
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
