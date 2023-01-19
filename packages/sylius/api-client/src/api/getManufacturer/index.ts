import { CustomQuery } from '@vue-storefront/core';
import { queryAll, queryOne, querySearch } from './queries';
import gql from 'graphql-tag';

const setAbsoluteImagePaths = (context, collection: any, mapProductImages = false) => {

  const { imagePaths } = context.config;

  collection.map(item => {
    if (item.images) {
      const mapImages = item.images.edges;
      item.images = mapImages.map(img => ['https://sylius-master-dev.praguebest.cz', img.node.path].join('/'));
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
export async function getManufacturerAll(context, params, customQuery?: CustomQuery) {

  const { locale } = context.config;

  const key = 'getManufacturerAll';

  let cached;
  let manufacturersData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    cached = await getKey(key);
  }

  let pagination = {};
  let manufacturers = [];

  if (!cached) {

    const { manufacturersQuery } = context.extendQuery(
      customQuery,
      {
        manufacturersQuery: {
          query: queryAll,
          variables: { itemsPerPage: 10000, page: 1, localeCode: locale }
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${manufacturersQuery.query}`,
      variables: manufacturersQuery.variables,
      fetchPolicy: 'no-cache'
    });

    pagination = data.manufacturers.paginationInfo;
    manufacturers = data.manufacturers.collection;

    context.config.lruCache.set(key, JSON.stringify({ manufacturers, pagination }));
  } else {
    manufacturersData = JSON.parse(cached);
    manufacturers = manufacturersData.manufacturers;
    pagination = manufacturersData.pagination;
  }

  manufacturers = setAbsoluteImagePaths(context, manufacturers);

  return {
    manufacturers,
    pagination,
  };
}

/* zatim neni pouzito */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getManufacturerSearch(context, params, customQuery?: CustomQuery) {

  const key = 'getManufacturerSearch';

  let cached;
  let manufacturersData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
  }

  let pagination = {};
  let manufacturers = [];

  if (!cached) {

    const { manufacturersQuery } = context.extendQuery(
      customQuery,
      {
        manufacturersQuery: {
          query: querySearch,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${manufacturersQuery.query}`,
      variables: manufacturersQuery.variables,
      fetchPolicy: 'no-cache'
    });

    pagination = data.manufacturers.paginationInfo;
    manufacturers = data.manufacturers.collection;

    context.config.lruCache.set(key, JSON.stringify({ manufacturers, pagination }));
  } else {
    manufacturersData = JSON.parse(cached);
    manufacturers = manufacturersData.manufacturers;
    pagination = manufacturersData.pagination;
  }

  return {
    manufacturers,
    pagination,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getManufacturerOne(context, params, customQuery?: CustomQuery) {

  const key = `getManufacturerOne${params.slug}${params.page}${params.productsItemsPerPage}`;

  let cached;
  let manufacturersData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    cached = await getKey(key);
  }

  let manufacturer = [];

  if (!cached) {

    const { manufacturersQuery } = context.extendQuery(
      customQuery,
      {
        manufacturersQuery: {
          query: queryOne,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${manufacturersQuery.query}`,
      variables: manufacturersQuery.variables,
      fetchPolicy: 'no-cache'
    });

    manufacturer = data.manufacturers.collection;
    context.config.lruCache.set(key, JSON.stringify(manufacturer));
  } else {
    manufacturersData = JSON.parse(cached);
    manufacturer = manufacturersData;
  }

  manufacturer = setAbsoluteImagePaths(context, manufacturer, true);

  return {
    manufacturer,
  };
}
