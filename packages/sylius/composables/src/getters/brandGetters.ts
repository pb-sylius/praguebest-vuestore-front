import { Brand, Product } from '@realtainment/sylius-api/src/types';
import { AgnosticPrice } from '@vue-storefront/core';

export interface BrandGetters<BRAND> {
  getName: (brand: BRAND) => string;
  getSlug: (brand: BRAND) => string;
  getCoverImage: (brand: BRAND) => string;
  getId: (brand: BRAND) => string;
  getProducts: (brand: BRAND) => Product[];
  getProductsPagination: (brand: BRAND, activePage: number) => any;
  getProductPrice: (product: any) => AgnosticPrice,
  getProductImage: (product: any) => string;
  [getterName: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getBrandName = (brand: Brand): string => brand.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getBrandSlug = (brand: Brand): string => brand.slug;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getBrandCoverImage = (brand: Brand): string => {
  if (Array.isArray(brand?.images) && brand?.images.length) {
    return brand.images[0];
  }
  return '';
};

export const getBrandProducts = (brand: Brand): Product[] => {
  if (Array.isArray(brand?.products?.collection) && brand?.products?.collection.length) {
    return brand?.products?.collection;
  }
  return [];
}

export const getBrandProductsPagination = (brand: Brand, activePage: number): any => {

  const pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 0,
    pageOptions: []
  }
  if (brand?.products?.paginationInfo) {
    pagination.currentPage = Number(activePage);
    pagination.totalPages = brand.products.paginationInfo.lastPage;
    pagination.totalItems = brand.products.paginationInfo.totalCount;
    pagination.itemsPerPage = brand.products.paginationInfo.itemsPerPage;
  }

  return pagination;
}

export const getBrandDescription = (brand: Brand): string => (brand as any)?.description || '';

export const getBrandId = (brand: Brand): string => (brand as any)?._id || '';

export const getProductPrice = (product: any): AgnosticPrice => {
  let price = product?.variants?.collection[0].channelPricings?.collection[0].price;

  if (price) price /= 100;
  return {
    regular: price || 0,
    special: 0
  };
};

export const getProductImage = (product: any): string => {
  return product.images.collection[0].replaceAll('"', '');
}

export const brandGetters: BrandGetters<Brand> = {
  getName: getBrandName,
  getSlug: getBrandSlug,
  getDescription: getBrandDescription,
  getId: getBrandId,
  getCoverImage: getBrandCoverImage,
  getProducts: getBrandProducts,
  getProductsPagination: getBrandProductsPagination,
  getProductPrice: getProductPrice,
  getProductImage: getProductImage
};
