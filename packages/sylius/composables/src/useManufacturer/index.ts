import { Context, Logger } from '@vue-storefront/core';
import {
  useManufacturerFactory,
  ManufacturerSearchParams,
  UseManufacturerFactoryParams,
  ManufacturerResponse
} from '../../../modules/manufacturer/src';

const params: UseManufacturerFactoryParams<ManufacturerResponse, any> = {
  manufacturersSearch: async (context: Context, params: ManufacturerSearchParams): Promise<ManufacturerResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getManufacturerAll(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  }
};

export const useManufacturer = useManufacturerFactory<ManufacturerResponse, any>(params);
