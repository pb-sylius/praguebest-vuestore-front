import { CustomQuery } from '@vue-storefront/core';
import { queryAll, queryOne, querySearch } from './queries';
import gql from 'graphql-tag';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getManufacturerAll(context, params?, customQuery?: CustomQuery) {

  const key = 'getManufacturerAll';

  console.log('entering getManufacturerAll')

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
          query: queryAll,
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${manufacturersQuery.query}`,
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
export async function getManufacturerSearch(context, params?, customQuery?: CustomQuery) {

  const key = 'getManufacturerSearch';

  console.log('entering getManufacturerSearch')

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

  const key = 'getManufacturerOne';

  let cached;
  let manufacturersData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
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

    manufacturer = data.manufacturer;

    context.config.lruCache.set(key, JSON.stringify(manufacturer));
  } else {
    manufacturersData = JSON.parse(cached);
    manufacturer = manufacturersData;
  }

  return {
    manufacturer
  };
}
