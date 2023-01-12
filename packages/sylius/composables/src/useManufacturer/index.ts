import { Context, Logger } from '@vue-storefront/core';

import {
  useManufacturerFactory,
  ManufacturerSearchParams,
} from '@praguebest/manufacturer'

import { ManufacturerResponse } from '../types';

const params: any = {
  manufacturersAll: async (context: Context, params: ManufacturerSearchParams): Promise<ManufacturerResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getManufacturerAll(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  },
  manufacturersOne: async (context: Context, params: ManufacturerSearchParams): Promise<ManufacturerResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getManufacturerOne(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  },
  manufacturersSearch: async (context: Context, params: ManufacturerSearchParams): Promise<ManufacturerResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getManufacturerSearch(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  }
};

export const useManufacturer = useManufacturerFactory<ManufacturerResponse, any>(params);
