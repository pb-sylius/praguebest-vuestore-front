import { CustomQuery } from '@vue-storefront/core';
import { queryAll, queryOne, querySearch } from './queries';
import gql from 'graphql-tag';

const setAbsoluteImagePaths = (context, collection: any, mapProductImages = false) => {

  const { imagePaths } = context.config;

  collection.map(item => {
    if (item.imageRefs) {
      const mapImages = item.imageRefs.edges;
      item.images = mapImages.map(img => [imagePaths.regular, img.node.path].join('/'));
      delete item.imageRefs;
    }

    if (mapProductImages && item.products && item.products.collection) {
      for (const [key, value] of (<any>Object).entries(item.products.collection)) {
        value.images.collection.forEach((img, index) => {
          value.images.collection[index] = [imagePaths.regular, img.path].join('/')
        });
        item.products.collection[key].images.collection = value.images.collection;
      }
    }

  });

  return collection;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getBrandAll(context, params, customQuery?: CustomQuery) {

  const { locale } = context.config;

  const key = 'getBrandAll';

  let cached;
  let brandsData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
  }

  let pagination = {};
  let brands = [];

  if (!cached) {

    const { brandsQuery } = context.extendQuery(
      customQuery,
      {
        brandsQuery: {
          query: queryAll,
          variables: { itemsPerPage: 10000, page: 1, localeCode: locale }
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${brandsQuery.query}`,
      variables: brandsQuery.variables,
      fetchPolicy: 'no-cache'
    });

    pagination = data.brands.paginationInfo;
    brands = data.brands.collection;

    context.config.lruCache.set(key, JSON.stringify({ brands, pagination }));
  } else {
    brandsData = JSON.parse(cached);
    brands = brandsData.brands;
    pagination = brandsData.pagination;
  }

  brands = setAbsoluteImagePaths(context, brands);

  return {
    brands,
    pagination,
  };
}

/* zatim neni pouzito */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getBrandSearch(context, params, customQuery?: CustomQuery) {

  const key = 'getBrandSearch';

  let cached;
  let brandsData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
  }

  let pagination = {};
  let brands = [];

  if (!cached) {

    const { brandsQuery } = context.extendQuery(
      customQuery,
      {
        brandsQuery: {
          query: querySearch,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${brandsQuery.query}`,
      variables: brandsQuery.variables,
      fetchPolicy: 'no-cache'
    });

    pagination = data.brands.paginationInfo;
    brands = data.brands.collection;

    context.config.lruCache.set(key, JSON.stringify({ brands, pagination }));
  } else {
    brandsData = JSON.parse(cached);
    brands = brandsData.brands;
    pagination = brandsData.pagination;
  }

  return {
    brands,
    pagination,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getBrandOne(context, params, customQuery?: CustomQuery) {

  const key = `getBrandOne${params.slug}${params.page}${params.productsItemsPerPage}`;

  let cached;
  let brandsData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    cached = await getKey(key);
  }

  let brand = [];

  if (!cached) {

    const { brandsQuery } = context.extendQuery(
      customQuery,
      {
        brandsQuery: {
          query: queryOne,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${brandsQuery.query}`,
      variables: brandsQuery.variables,
      fetchPolicy: 'no-cache'
    });

    brand = data.brands.collection;
    context.config.lruCache.set(key, JSON.stringify(brand));
  } else {
    brandsData = JSON.parse(cached);
    brand = brandsData;
  }

  brand = setAbsoluteImagePaths(context, brand, true);

  return {
    brand,
  };
}
