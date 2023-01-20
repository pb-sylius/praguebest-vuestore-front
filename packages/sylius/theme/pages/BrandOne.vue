<template>
  <div v-if="!loading">
    <SfOneBrandHead
      :image="image"
      :title="name"
      :description="description"
    />
    <div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading && products.length">
          <div class="products__grid">
            <SfProductCard v-e2e="'category-product-card'" v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="addBasePath(brandGetters.getProductImage(product))"
              :regular-price="$n(brandGetters.getProductPrice(product).regular, 'currency')"
              :special-price="brandGetters.getProductPrice(product).special && $n(brandGetters.getProductPrice(product).special, 'currency')"
              :max-rating="5" :score-rating="productGetters.getAverageRating(product)" :show-add-to-cart-button="true"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="products__product-card"
              />
          </div>
        </div>
        <div v-else class="no_products">{{ $t('We currently do not offer any products for this brand.') }}</div>
      </SfLoader>
      <div class="centered_pagination">
          <LazyHydrate on-interaction>
            <SfPagination v-if="!loading" class="products__pagination" v-show="productsPagination.totalPages > 1"
              :current="productsPagination.currentPage" :total="productsPagination.totalPages" :visible="5" />
          </LazyHydrate>
      </div>
    </div>
</div>

</template>

<script>

import SfOneBrandHead from '../ui/components/molecules/SfOneBrandHead/SfOneBrandHead.vue';
import SfPagination from "../ui/components/molecules/SfPagination/SfPagination.vue";
import SfProductCard from "../ui/components/organisms/SfProductCard/SfProductCard.vue";
import SfLoader from "../ui/components/atoms/SfLoader/SfLoader.vue";
import SfAccordion from "../ui/components/organisms/SfAccordion/SfAccordion.vue";
import SfList from "../ui/components/organisms/SfList/SfList.vue";

import LazyHydrate from 'vue-lazy-hydration';
import { onSSR } from '@vue-storefront/core';
import { computed, ref } from '@vue/composition-api';
import { productsPerPage } from '../ui/config';
import {
  productGetters,
  useBrand,
  brandGetters
} from '@realtainment/sylius';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'BrandOne',
  setup(props, context) {

    const { slug } = context.root.$route.params;
    const { brands, one, loading } = useBrand('brands');

    const page = ref(Number(context.root.$route.query.page ? context.root.$route.query.page : 1));
    const perPage = ref(productsPerPage);

    const name = computed(() => brandGetters.getName(brands.value?.brand[0])) || '';
    const description = computed(() => brandGetters.getDescription(brands.value?.brand[0])) || '';
    const image = computed(() => brandGetters.getCoverImage(brands.value?.brand[0])) || '';
    const products = computed(() => brandGetters.getProducts(brands.value?.brand[0])) || [];
    const productsPagination = computed(() => brandGetters.getProductsPagination(brands.value?.brand[0], page)) || {};

    onSSR(async () => {
      await one({ slug, page: page.value, productsItemsPerPage: perPage.value })
    });

    return {
      name,
      description,
      image,
      products,
      productsPagination,
      loading,
      productGetters,
      brandGetters,
      addBasePath,
    };
  },
  components: {
    SfOneBrandHead,
    SfPagination,
    LazyHydrate,
    SfLoader,
    SfProductCard,
    SfAccordion,
    SfList,
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

.no_products {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 10px;
}

.centered_pagination {
  border-top: 2px solid var(--c-light);
  margin-top: 20px;
}

.centered_pagination .products__pagination {
  justify-content: center;
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
