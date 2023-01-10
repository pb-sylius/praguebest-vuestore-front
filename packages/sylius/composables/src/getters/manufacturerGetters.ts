import { ManufacturerGetters } from '@praguebest/manufacturer';
import { Manufacturer, Product } from '@realtainment/sylius-api/src/types';
import { AgnosticPrice } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerName = (manufacturer: Manufacturer): string => manufacturer.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerSlug = (manufacturer: Manufacturer): string => manufacturer.slug;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerCoverImage = (manufacturer: Manufacturer): string => {
  if (Array.isArray(manufacturer?.images) && manufacturer?.images.length) {
    return manufacturer.images[0];
  }
  return '';
};

export const getManufacturerProducts = (manufacturer: Manufacturer): Product[] => {
  if (Array.isArray(manufacturer?.products?.collection) && manufacturer?.products?.collection.length) {
    return manufacturer?.products?.collection;
  }
  return [];
}

export const getManufacturerProductsPagination = (manufacturer: Manufacturer, activePage: number): any => {

  const pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 0,
    pageOptions: []
  }
  if (manufacturer?.products?.paginationInfo) {
    pagination.currentPage = Number(activePage);
    pagination.totalPages = manufacturer.products.paginationInfo.lastPage;
    pagination.totalItems = manufacturer.products.paginationInfo.totalCount;
    pagination.itemsPerPage = manufacturer.products.paginationInfo.itemsPerPage;
  }

  return pagination;
}

export const getManufacturerDescription = (manufacturer: Manufacturer): string => (manufacturer as any)?.description || '';

export const getManufacturerId = (manufacturer: Manufacturer): string => (manufacturer as any)?._id || '';

export const getProductPrice = (product: any): AgnosticPrice => {
  let price = product?.variants?.collection[0].channelPricings?.collection[0].price;

  if (price) price /= 100;
  return {
    regular: price || 0,
    special: 0
  };
};

export const getProductImage = (product: any): string => {
  return product.images.collection[0];
}

export const manufacturerGetters: ManufacturerGetters<Manufacturer> = {
  getName: getManufacturerName,
  getSlug: getManufacturerSlug,
  getDescription: getManufacturerDescription,
  getId: getManufacturerId,
  getCoverImage: getManufacturerCoverImage,
  getProducts: getManufacturerProducts,
  getProductsPagination: getManufacturerProductsPagination,
  getProductPrice: getProductPrice,
  getProductImage: getProductImage
};
