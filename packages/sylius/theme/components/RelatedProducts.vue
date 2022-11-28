<template>

</template>

<script lang="ts">
import SfCarousel from "../ui/components/organisms/SfCarousel/SfCarousel.vue";
import SfProductCard from "../ui/components/organisms/SfProductCard/SfProductCard.vue";
import SfSection from "../ui/components/molecules/SfSection/SfSection.vue";
import SfLoader from "../ui/components/atoms/SfLoader/SfLoader.vue";

import { productGetters, useWishlist, wishlistGetters, useCart } from '@realtainment/sylius';
import { computed } from '@vue/composition-api';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'RelatedProducts',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  },
  setup() {
    const { addItem: addItemToCart, isInCart } = useCart();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();
    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistProduct.variant.sku === productItem.sku);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      removeItemFromWishlist({ product });
    };
    return {
      productGetters,
      addItemToWishlist,
      isInWishlist,
      removeProductFromWishlist,
      addItemToCart,
      isInCart,
      addBasePath
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
    margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
