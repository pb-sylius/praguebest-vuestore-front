<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                v-e2e="'collected-product'"
                :key="cartGetters.getItemSku(product)"
                :image="cartGetters.getItemImage(product)"
                :title="cartGetters.getItemName(product)"
                :regular-price="$n(cartGetters.getItemPrice(product).regular, 'currency')"
                :special-price="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
                :stock="99999"
                @click:remove="removeItem({ product })"
                class="collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(attribute, key) in cartGetters.getItemAttributes(product, ['color', 'size'])"
                      :key="key"
                      :name="key"
                      :value="attribute"
                    />
                  </div>
                </template>
                <template #input>
                  <div class="sf-collected-product__quantity-wrapper">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateQuantity({ product, quantity: $event })"
                    />
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :src="emptyCartImg"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Subtotal price"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(totals.subtotal, 'currency')"
                  :special="(totals.special !== totals.subtotal) ? $n(totals.special, 'currency') : 0"
                />
              </template>
            </SfProperty>
            <nuxt-link :to="localePath({ name: 'billing' })">
              <SfButton
                v-e2e="'go-to-checkout-btn'"
                class="sf-button--full-width color-secondary"
                @click="toggleCartSidebar"
              >
                {{ $t('Go to checkout') }}
              </SfButton>
            </nuxt-link>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >{{ $t('Go back shopping') }}</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import SfSidebar from "../ui/components/organisms/SfSidebar/SfSidebar.vue";
import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfButton from "../ui/components/atoms/SfButton/SfButton.vue";
import SfIcon from "../ui/components/atoms/SfIcon/SfIcon.vue";
import SfProperty from "../ui/components/atoms/SfProperty/SfProperty.vue";
import SfPrice from "../ui/components/atoms/SfPrice/SfPrice.vue";
import SfCollectedProduct from "../ui/components/organisms/SfCollectedProduct/SfCollectedProduct.vue";
import SfImage from "../ui/components/atoms/SfImage/SfImage.vue";
import SfQuantitySelector from "../ui/components/atoms/SfQuantitySelector/SfQuantitySelector.vue";
import emptyCartImg from "../ui/icons/empty_cart.svg";

import { computed } from '@vue/composition-api';
import { useCart, useUser, cartGetters } from '@realtainment/sylius';
import useUiState from '../composables/useUiState';
import debounce from 'lodash.debounce';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, load: loadCart, loading } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    loadCart();

    const updateQuantity = debounce(async ({ product, quantity }) => {
      await updateItemQty({ product, quantity });
    }, 500);

    return {
      updateQuantity,
      loading,
      isAuthenticated,
      products,
      removeItem,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters
    };
  },
  data() {
    return {
      emptyCartImg: emptyCartImg
    }
  }
};
</script>

<style lang="scss" scoped>
  #cart {
    --sidebar-z-index: 3;
    --overlay-z-index: 3;
    --sidebar-width: #{$breakpoint-2xs};
    --sidebar-right: 0;
    --sidebar-left: auto;
    @include breakpoint-xs {
      --sidebar-width: 100%;
    }
    @include for-desktop {
      & > * {
        --sidebar-bottom-padding: var(--spacer-base);
        --sidebar-content-padding: var(--spacer-base);
      }
    }
  }
  .cart-summary {
    margin-top: var(--spacer-xl);
  }
  .my-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
    &__total-items {
      margin: 0;
    }
    &__total-price {
      --price-font-size: var(--font-size--xl);
      --price-font-weight: var(--font-weight--medium);
      margin: 0 0 var(--spacer-base) 0;
    }
  }
  .empty-cart {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    &__banner {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    &__heading {
      padding: 0 var(--spacer-base);
    }
    &__image {
      --image-width: 16rem;
      margin: 0 0 var(--spacer-2xl) 7.5rem;
    }
    @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
    }
  }
  .collected-product-list {
    flex: 1;
  }
  .collected-product {
    margin: 0 0 var(--spacer-sm) 0;
    &__properties {
      margin: var(--spacer-xs) 0 0 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      flex: 2;
      &:first-child {
        margin-bottom: 8px;
      }
    }
    &__actions {
      transition: opacity 150ms ease-in-out;
    }
    &__save,
    &__compare {
      --button-padding: 0;
      &:focus {
        --cp-save-opacity: 1;
        --cp-compare-opacity: 1;
      }
    }
    &__save {
      opacity: var(--cp-save-opacity, 0);
    }
    &__compare {
      opacity: var(--cp-compare-opacity, 0);
    }
    &:hover {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
      @include for-desktop {
        .collected-product__properties {
          display: none;
        }
      }
    }
  }
</style>
