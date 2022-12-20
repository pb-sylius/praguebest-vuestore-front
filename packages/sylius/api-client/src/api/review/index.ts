import { getReviewsQuery } from './queries';
import { addReviewMutation } from './mutations';
import {mutate, query, extendQuery } from '../helpers';
import { CustomQuery } from '@storefront-pb/core';

export const getReviews = async (context, params) => {

  const key = params.productId + '_review';

  let cached;
  let reviewsData;

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    cached = await getKey(key);
  }

  if (!cached) {
    const { productReviews } = await query(context, getReviewsQuery, params);
    reviewsData = productReviews.collection;
    context.config.lruCache.set(key, JSON.stringify(reviewsData));
  } else {
    reviewsData = JSON.parse(cached);
  }

  return reviewsData;
};

export const addReview = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, addReviewMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);
  return {};
};
