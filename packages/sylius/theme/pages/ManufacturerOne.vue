<template>

</template>

<script>

import { useManufacturer, manufacturerGetters } from '@realtainment/sylius';
import { onSSR } from '@vue-storefront/core';
import { addBasePath } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  name: 'ManufacturerOne',
  setup(props, context) {
    //const { id, slug } = context.root.$route.params;
    const { manufacturers, one } = useManufacturer('manufacturers');

    /** temporary replacement for slug */
    const id = '/api/v2/manufacturers/3'

    console.log('manufacturers.value', manufacturers.value.manufacturer)

    const name = computed(() => manufacturerGetters.getName(manufacturers.value?.manufacturer)) || '';
    const products = computed(() => manufacturerGetters.getProducts(manufacturers.value?.manufacturer)) || [];

    console.log('products', products)

    onSSR(async () => {
      await one({ id, query: context.root.$route.query})
    });

    return {
      addBasePath
    };
  },
  components: {

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
