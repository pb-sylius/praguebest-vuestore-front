import {
  applyCouponMutation, addBillingAddressMutation, addShippingAddressMutation,
  createCartMutation, addToCartMutation, clearCartMutation, removeFromCartMutation,
  removeCouponFromCartMutation, updateCartPaymentMutation, updateCartShippingMutation,
  updateCartQuantityMutation
} from './mutations';
import {
  getCartQuery, getPaymentMethodsQuery, getShippingMethodsQuery, getCountriesQuery
} from './queries';
import { CustomQuery } from '@vue-storefront/core';
import { mutate, query, extendQuery, transformCart } from '../helpers';

export const createCart = async (context, customQuery?: CustomQuery) => {
  const { locale } = context.config;
  const defaultVariables = { locale };

  const queryGql = extendQuery(context, createCartMutation, defaultVariables, customQuery);
  const { cart } = await mutate(context, queryGql);
  const cartToken = `/api/v2/shop/orders/${cart.order.tokenValue}`;

  return {
    cartToken
  };
};

export const getCart = async (context, cartId: string, customQuery?: CustomQuery) => {

  let cached;
  let cartData;

  const { locale, acceptLanguage } = context.config;
  const variables = {
    cartId,
    locale,
    acceptLanguage
  };

  const key = 'cart_' + cartId.slice(cartId.lastIndexOf('/') + 1);

  const getKey = async (key) => {
    return context.config.lruCache.get(key);
  }

  if (key) {
    cached = await getKey(key);
  }

  if (!cached) {
    const queryGql = extendQuery(context, getCartQuery, variables, customQuery);
    cartData = await query(context, queryGql.query, variables);
    context.config.lruCache.set(key, JSON.stringify(cartData));
  } else {
    cartData = JSON.parse(cached);
  }

  return cartData.order ? transformCart(context, cartData.order) : {};
};

export const addToCart = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.token.slice(defaultVariables.token.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, addToCartMutation, defaultVariables, customQuery);
  const { shop_add_itemOrder } = await mutate(context, queryGql);
  const cartData = shop_add_itemOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const updateCartQuantity = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.cartId.slice(defaultVariables.cartId.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, updateCartQuantityMutation, defaultVariables, customQuery);
  const { shop_change_quantityOrder } = await mutate(context, queryGql);
  const cartData = shop_change_quantityOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const removeFromCart = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.cartId.slice(defaultVariables.cartId.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, removeFromCartMutation, defaultVariables, customQuery);
  const { shop_remove_itemOrder } = await mutate(context, queryGql);
  const cartData = shop_remove_itemOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const addCouponToCart = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.coupon.orderTokenValue.slice(defaultVariables.coupon.orderTokenValue.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, applyCouponMutation, defaultVariables, customQuery);
  const { shop_apply_couponOrder } = await mutate(context, queryGql);
  const cartData = shop_apply_couponOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const removeCouponFromCart = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.removeCouponInput.orderTokenValue.slice(defaultVariables.removeCouponInput.orderTokenValue.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, removeCouponFromCartMutation, defaultVariables, customQuery);
  const { shop_remove_couponOrder } = await mutate(context, queryGql);
  const cartData = shop_remove_couponOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

/* zatim neni na FE pouzito, az se bude pouzivat, je treba upravit cache i zde */
export const clearCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, clearCartMutation, defaultVariables, customQuery);
  const { deleteOrder } = await mutate(context, queryGql);
  return deleteOrder.order;
};

export const addAddress = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = defaultVariables.addAddressInput?.shippingAddress
    ? 'cart_' + defaultVariables.addAddressInput.orderTokenValue.slice(defaultVariables.addAddressInput.orderTokenValue.lastIndexOf('/') + 1)
    : 'cart_' + defaultVariables.addAddressInput.orderTokenValue.slice(defaultVariables.addAddressInput.orderTokenValue.lastIndexOf('/') + 1)

  const query = defaultVariables.addAddressInput?.shippingAddress
    ? addShippingAddressMutation
    : addBillingAddressMutation;
  const queryGql = extendQuery(context, query, defaultVariables, customQuery);
  const data = await mutate(context, queryGql);
  const cartData = defaultVariables.addAddressInput?.shippingAddress
    ? data.shop_add_shipping_addressOrder
    : data.shop_add_billing_addressOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return cartData.order;
};

export const updateCartPayment = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.paymentMethod.orderTokenValue.slice(defaultVariables.paymentMethod.orderTokenValue.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, updateCartPaymentMutation, defaultVariables, customQuery);
  const { shop_select_payment_methodOrder } = await mutate(context, queryGql);
  const cartData = shop_select_payment_methodOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const updateCartShipping = async (context, defaultVariables, customQuery?: CustomQuery) => {

  const key = 'cart_' + defaultVariables.shippingMethod.orderTokenValue.slice(defaultVariables.shippingMethod.orderTokenValue.lastIndexOf('/') + 1);

  const queryGql = extendQuery(context, updateCartShippingMutation, defaultVariables, customQuery);
  const { shop_select_shipping_methodOrder } = await mutate(context, queryGql);
  const cartData = shop_select_shipping_methodOrder;

  context.config.lruCache.set(key, JSON.stringify(cartData));

  return transformCart(context, cartData.order);
};

export const getPaymentMethods = async (context) => {
  const { locale } = context.config;
  const { paymentMethods } = await query(context, getPaymentMethodsQuery, {});

  console.log(paymentMethods)

  return paymentMethods.collection.map(method => {
    const translation = method.translations.collection.find(translation => translation.locale === locale);
    return {
      label: translation.name,
      value: method.code,
      description: translation.description
    };
  });
};

export const getShippingMethods = async (context, defaultVariables) => {
  const { locale } = context.config;
  const { shippingMethods } = await query(context, getShippingMethodsQuery, defaultVariables);

  console.log(shippingMethods)

  return shippingMethods.collection.map(method => {
    const translation = method.translations.collection.find(translation => translation.locale === locale);
    const channel = method.channels.collection[0].code;
    return {
      label: translation.name,
      value: method.code,
      description: translation.description,
      cost: method.configuration[channel].amount / 100
    };
  });
};

export const getCountries = async (context) => {
  const data = await query(context, getCountriesQuery, {});
  return data.countries.collection;
};
