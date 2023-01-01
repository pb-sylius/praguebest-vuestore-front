import { ManufacturerGetters } from '@praguebest/manufacturer';
import { Manufacturer, Product } from '@realtainment/sylius-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerName = (manufacturer: Manufacturer): string => manufacturer.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerSlug = (manufacturer: Manufacturer): string => manufacturer.slug;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManufacturerCoverImage = (manufacturer: Manufacturer): string => {
  if (Array.isArray(manufacturer?.images) && manufacturer?.images?.length) {
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

export const getManufacturerDescription = (manufacturer: Manufacturer): any => (manufacturer as any)?.description || '';

export const getManufacturerId = (manufacturer: Manufacturer): string => (manufacturer as any)?._id || '';

export const manufacturerGetters: ManufacturerGetters<Manufacturer> = {
  getName: getManufacturerName,
  getSlug: getManufacturerSlug,
  getDescription: getManufacturerDescription,
  getId: getManufacturerId,
  getCoverImage: getManufacturerCoverImage,
  getProducts: getManufacturerProducts
};
