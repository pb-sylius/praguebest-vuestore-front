import { CustomQuery } from '@vue-storefront/core';
import { queryAll } from './queries';
import gql from 'graphql-tag';

type ProductSort = {
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getManufacturerAll(context, params, customQuery?: CustomQuery) {

  let key;

  if ('categorySlug' in params) {
    key = params.categorySlug + params.page + 'product';
  }
  if ('slug' in params) {
    key = params.slug + 'product';
  }

  let cached;
  let manufacturersData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
  }

  if (params.sort) {
    const sortObject = {} as ProductSort;

    switch (params.sort) {
      case 'latest':
        sortObject.createdAt = 'DESC';
        break;
      case 'oldest':
        sortObject.createdAt = 'ASC';
        break;
    }
  }

  let pagination = {};
  let manufacturers = [];

  if (!cached) {
    const { manufacturersQuery } = context.extendQuery(
      customQuery,
      {
        productsQuery: {
          query: queryAll,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${manufacturersQuery.query}`,
      variables: manufacturersQuery.variables,
      fetchPolicy: 'no-cache'
    });

    const { locale, imagePaths } = context.config;
    pagination = data.manufacturers.paginationInfo;
    manufacturers = data.manufacturers.collection.map(item => {
      if (item.attributes) {
        item.attributes = item.attributes.edges
          .map(edges => edges.node)
          .filter(node => node.type === 'integer' || node.localeCode === locale);
      }
      if (item.imagesRef) {
        const mapImages = item.imagesRef.collection;
        item.images = mapImages.map(img => [imagePaths.thumbnail, img.path].join('/'));
        item.galleryImages = mapImages.map(img => [imagePaths.regular, img.path].join('/'));
        delete item.imagesRef;
      }
      return item;
    })
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

