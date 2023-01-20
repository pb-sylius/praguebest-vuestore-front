import { Context, Logger } from '@vue-storefront/core';

import { useBrandFactory } from '@praguebest/brand';

import { BrandResponse, BrandSearchParams, UseBrandFactoryParams} from '../types';

const params: UseBrandFactoryParams<BrandResponse, any> = {
  brandsAll: async (context: Context, params: BrandSearchParams): Promise<BrandResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getBrandAll(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  },
  brandsOne: async (context: Context, params: BrandSearchParams): Promise<BrandResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getBrandOne(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  },
  brandsSearch: async (context: Context, params: BrandSearchParams): Promise<BrandResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getBrandSearch(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  }
};

export const useBrand = useBrandFactory<BrandResponse, any>(params);
