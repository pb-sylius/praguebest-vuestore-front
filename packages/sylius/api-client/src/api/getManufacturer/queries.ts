import gql from 'graphql-tag';
import { manufacturersFragment } from './fragments';

export const queryAll = gql`
  query getManufacturers(
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
