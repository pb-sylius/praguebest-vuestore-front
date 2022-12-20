import { CustomQuery, Context } from '@storefront-pb/core';
import { BaseQuery } from './queries';
import gql from 'graphql-tag';

export default async function getCategory(context: Context, params, customQuery?: CustomQuery): Promise<any> {

  let key;

  if ('categorySlug' in params) {
    key = params.categorySlug + params.page + 'category';
  }
  if ('level' in params) {
    key = 'level' + params.level + 'category';
  }

  let cached;
  let catData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    //cached = await getKey(key);
  }

  const { categoryList } = context.extendQuery(
    customQuery,
    {
      categoryList: {
        query: BaseQuery,
        variables: params
      }
    }
  );

  if (!cached) {
    const { data } = await context.client.query({
      query: gql`${categoryList.query}`,
      variables: categoryList.variables
    });
    context.config.lruCache.set(key, JSON.stringify(data));
    catData = data;
  } else {
    catData = JSON.parse(cached);
  }

  const categories = catData.taxa.collection.map(cat => {
    if (cat.children) cat.children = cat.children.collection;
    return cat;
  });

  return categories;
}
