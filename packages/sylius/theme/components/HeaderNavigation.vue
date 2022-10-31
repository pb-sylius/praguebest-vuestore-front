<template>
  <div>
    <div class="sf-header__navigation desktop">
      <SfHeaderNavigationItem v-for="(category, index) in categories" :key="index" class="nav-item"
        v-e2e="`app-header-url_${category.slug}`" :label="category.name" :link="localePath(`/c/${category.slug}`)" />
    </div>
</div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import SfMenuItem from "../ui/components/molecules/SfMenuItem/SfMenuItem.vue";
import SfModal from "../ui/components/molecules/SfModal/SfModal.vue";
import { mapMenuObserver } from "../ui/utilities/menu-observer";

import useUiState from '../composables/useUiState';
import { useCategory } from '@realtainment/sylius';
export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const {
      categories,
      search: categoriesListSearch
    } = useCategory('AppHeader:CategoryList');

    onSSR(async () => {
      await categoriesListSearch({
        level: 1
      });
    });

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
  computed: {
    ...mapMenuObserver(),
  },
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: none;
  }
}

.nav-item {
  white-space: nowrap;
}

.sf-modal {
  ::v-deep &__bar {
    display: none;
  }

  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
