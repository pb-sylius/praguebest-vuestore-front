<template>
  <div id="category">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
    <div class="navbar section">
      <div class="navbar__aside">
        <LazyHydrate never>
          <SfHeading :level="3" :title="$t('Categories')" class="navbar__title" />
        </LazyHydrate>
      </div>
      <CategoryPageHeader :pagination="pagination" />
    </div>

    <div class="main section">
      <div class="sidebar">
        <LazyHydrate when-idle>
          <SfLoader :class="{ 'loading--categories': loading }" :loading="loading">
            <SfAccordion v-e2e="'categories-accordion'" :open="activeCategory" :show-chevron="true">
              <SfAccordionItem v-for="(cat, i) in categoryTree && categoryTree.items" :key="i" :header="cat.label">
                <template>
                  <SfList class="list">
                    <SfListItem class="list__item">
                      <SfMenuItem :count="cat.count || ''" :label="cat.label">
                        <template #label>
                          <nuxt-link :to="localePath(th.getCatLink(cat))"
                            :class="cat.isCurrent ? 'sidebar--cat-selected' : ''">
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                    <SfListItem class="list__item" v-for="(subCat, j) in cat.items" :key="j">
                      <SfMenuItem :count="subCat.count || ''" :label="subCat.label">
                        <template #label="{ label }">
                          <nuxt-link :to="localePath(th.getCatLink(subCat))"
                            :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''">
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <div v-if="isCategoryGridView" class="products__grid">
            <SfProductCard v-e2e="'category-product-card'" v-for="(product, i) in products"
              :key="productGetters.getSlug(product)" :style="{ '--index': i }" :title="productGetters.getName(product)"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :max-rating="5" :score-rating="productGetters.getAverageRating(product)" :show-add-to-cart-button="true"
              :is-in-wishlist="isInWishlist({ product })" :is-added-to-cart="isInCart({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="products__product-card"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="addToCart({ product, quantity: 1 })" />
          </div>
          <div v-else class="products__list">
            <SfProductCardHorizontal v-e2e="'category-product-card'" v-for="(product, i) in products"
              class="products__product-card-horizontal" :key="productGetters.getSlug(product)" :style="{ '--index': i }"
              :title="productGetters.getName(product)" :description="productGetters.getDescription(product)"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :max-rating="5" :score-rating="3" :qty="1" :is-in-wishlist="isInWishlist({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @input="productsQuantity[product._id] = $event"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="addToCart({ product, quantity: Number(productsQuantity[product._id]) })">
              <template #configuration>
                <SfProperty name="Size" value="XS" style="margin: 0 0 1rem 0;" />
                <SfProperty name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton class="sf-button--text" style="margin: 0 0 1rem auto; display: block;" @click="() => { }">
                  {{ $t('Save for later') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </div>

          <LazyHydrate on-interaction>
            <SfPagination v-if="!loading" class="products__pagination" v-show="pagination.totalPages > 1"
              :current="pagination.currentPage" :total="pagination.totalPages" :visible="5" />
          </LazyHydrate>

        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import SfSidebar from "../ui/components/organisms/SfSidebar/SfSidebar.vue";
import SfButton from "../ui/components/atoms/SfButton/SfButton.vue";
import SfList from "../ui/components/organisms/SfList/SfList.vue";
import SfIcon from "../ui/components/atoms/SfIcon/SfIcon.vue";
import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfMenuItem from "../ui/components/molecules/SfMenuItem/SfMenuItem.vue";
import SfFilter from "../ui/components/molecules/SfFilter/SfFilter.vue";
import SfProductCard from "../ui/components/organisms/SfProductCard/SfProductCard.vue";
import SfProductCardHorizontal from "../ui/components/organisms/SfProductCardHorizontal/SfProductCardHorizontal.vue";
import SfPagination from "../ui/components/molecules/SfPagination/SfPagination.vue";
import SfAccordion from "../ui/components/organisms/SfAccordion/SfAccordion.vue";
import SfSelect from "../ui/components/molecules/SfSelect/SfSelect.vue";
import SfBreadcrumbs from "../ui/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue";
import SfLoader from "../ui/components/atoms/SfLoader/SfLoader.vue";
import SfColor from "../ui/components/atoms/SfColor/SfColor.vue";
import SfProperty from "../ui/components/atoms/SfProperty/SfProperty.vue";

import { computed, ref } from '@nuxtjs/composition-api';
import { useCart, useWishlist, productGetters, useFacet, facetGetters, wishlistGetters } from '@realtainment/sylius';
import useUiState from '../composables/useUiState';
import useUiHelpers from '../composables/useUiHelpers';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import { addBasePath } from '@vue-storefront/core';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  name: 'Category',
  setup(props, context) {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { result, search, loading, error } = useFacet();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();

    const { toggleHamburgerMenu } = useUiState();
    toggleHamburgerMenu(false);

    const productsQuantity = ref({});

    const products = computed(() => facetGetters.getProducts(result.value));

    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));

    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const activeCategory = computed(() => {
      const items = categoryTree.value.items;

      if (!items || !items.length) {
        return '';
      }

      const category = items.find(({ isCurrent, items }) => isCurrent || items.find(({ isCurrent }) => isCurrent));

      return category?.label || items[0].label;
    });

    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistProduct.variant.sku === productItem.sku);
      removeItemFromWishlist({ product });
    };

    const addToCart = ({ product, quantity }) => {
      const { id, sku } = product;
      addItemToCart({
        product: { id, sku },
        quantity
      });
    };

    onSSR(async () => {
      await search(th.getFacetsFromURL());
      if (error?.value?.search) context.root.$nuxt.error({ statusCode: 404 });
    });

    return {
      ...uiState,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      activeCategory,
      breadcrumbs,
      addItemToWishlist,
      removeProductFromWishlist,
      isInWishlist,
      addToCart,
      isInCart,
      productsQuantity,
      addBasePath
    };
  },
  components: {
    CategoryPageHeader,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate
  },
  computed: {
    console: () => console,
    window: () => window,
  }
};
</script>

<style lang="scss" scoped>
@import "../ui/styles/helpers";

#category {
  box-sizing: border-box;
  max-width: $breakpoint-md;
  margin: 0 auto;
}

.main {
  &.section {
    padding: var(--spacer-xs);
    padding: 0;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  border-width: 1px 0 1px 0;

  &.section {
    padding: var(--spacer-sm);
    padding: 0;
  }

  &__aside {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__main {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.main {
  display: flex;
}

.list {
  --menu-item-font-size: var(--font-size--sm);

  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.loading {
  margin: var(--spacer-3xl) auto;

  @include for-desktop {
    margin-top: 6.25rem;
  }

  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
</style>
