import gql from 'graphql-tag';
import { productFragment } from './fragments';

export const BaseQuery = gql`
  query getProducts(
    $slug: String
    $categorySlug: String,
    $orderBy: [ProductFilter_order],
    $itemsPerPage: Int,
    $page: Int,
    $search: String,
    $manufacturerCode: String
  ) {
    products(
      translations_name: $search,
      translations_slug: $slug,
      productTaxons_taxon_translations_slug: $categorySlug,
      order: $orderBy,
      page: $page,
      itemsPerPage: $itemsPerPage,
      manufacturerCode: $manufacturerCode
    ) {
      collection {
        ${productFragment}
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`;
