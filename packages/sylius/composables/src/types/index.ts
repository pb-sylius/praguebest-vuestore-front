import {
  PlatformApi,
  Context,
  CustomQuery,
  FactoryParams,
} from "@vue-storefront/core";

import { ProductsSearchParams } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export { UseManufacturer } from '@praguebest/manufacturer';

export type Address = Record<string, unknown>;

export type Category = Record<string, unknown>;

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserAddress = Record<string, unknown>;
export type CartItem = Record<string, unknown>;

export type Cart = {
  totals: number;
  items: CartItem[];
}

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Product = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export interface ManufacturerSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  id?: string;
  [x: string]: any;
}

export interface UseManufacturerFactoryParams<MANUFACTURERS, MANUFUACTURER_SEARCH_PARAMS extends ManufacturerSearchParams, API extends PlatformApi = any> extends FactoryParams<API> {
  manufacturersSearch: (context: Context, params: MANUFUACTURER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<MANUFACTURERS>;
  manufacturersAll: (context: Context, params: MANUFUACTURER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<MANUFACTURERS>;
  manufacturersOne: (context: Context, params: MANUFUACTURER_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<MANUFACTURERS>;
}

export type Manufacturer = Record<string, unknown>;

export type ManufacturerResponse = {
    data: Manufacturer[];
    total: number;
};

export interface BrandSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  id?: string;
  [x: string]: any;
}

export interface UseBrandFactoryParams<BRANDS, BRAND_SEARCH_PARAMS extends BrandSearchParams, API extends PlatformApi = any> extends FactoryParams<API> {
  manufacturersSearch: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
  manufacturersAll: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
  manufacturersOne: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
}

export type Brand = Record<string, unknown>;

export type BrandResponse = {
    data: Brand[];
    total: number;
};


export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  results: any[];
  total: number;
};

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = TODO;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = TODO;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;
