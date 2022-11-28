<template>
  <div>
    <SfHeader class="sf-header--has-mobile-search sf-use-mobile-observer"
      :class="{ 'header-on-top': isSearchOpen, 'use-hamburger-menu': mainMenuToHamburger }"
      :isNavVisible="isMobileMenuOpen">
      <template #logo>
        <nuxt-link :to="localePath({ name: 'home' })" class="sf-header__logo">
          <SfImage v-if="!implementLogoSymbol" :src="headerLogo" alt="PragueBest" class="sf-header__logo-image"
            :placeholder="headerLogo" :width="logoBaseWidth" :height="logoBaseHeight" />
          <SfImage v-else :src="headerLogoSymbol" alt="PragueBest" class="sf-header__logo-image"
            :placeholder="headerLogoSymbol" :width="reducedLogoWidth" :height="reducedLogoHeight" />
        </nuxt-link>
      </template>
      <template #navigation>
        <HeaderNavigation />
      </template>
      <template #aside>
        <SfButton v-if="!useMobileSearch && mainMenuToHamburger" class="sf-header__action sf-mobile_search"
          @click="toggleCartSidebar">
          <SfIcon class="sf-header__icon" icon="search" size="24px" />
        </SfButton>
        <SfButton v-if="mainMenuToHamburger" v-e2e="'app-header-cart'" class="sf-header__action sf-mobile_cart"
          @click="toggleCartSidebar">
          <SfIcon class="sf-header__icon" icon="empty_cart" size="24px" color="white" />
          <SfBadge v-if="cartTotalItems > 0" key="cart_badge" class="sf-badge--number cart-badge">{{ cartTotalItems }}
          </SfBadge>
        </SfButton>
        <SfMobileMenu v-if="mainMenuToHamburger" class="sf-header__action">
        </SfMobileMenu>
        <LocaleSelector v-if="mainMenuToHamburger" />
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton v-e2e="'app-header-cart'" class="sf-button--pure sf-header__action" @click="toggleCartSidebar"
            v-if="!useMobileSearch">
            <SfIcon class="sf-header__icon" icon="search" size="1.2rem" />
          </SfButton>
          <SfButton v-e2e="'app-header-account'" class="sf-button--pure sf-header__action" @click="handleAccountClick">
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton class="sf-button--pure sf-header__action" @click="toggleWishlistSidebar">
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
          </SfButton>
          <SfButton v-e2e="'app-header-cart'" class="sf-button--pure sf-header__action" @click="toggleCartSidebar">
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge v-if="cartTotalItems > 0" key="cart_badge" class="sf-badge--number cart-badge">{{ cartTotalItems }}
            </SfBadge>
          </SfButton>
        </div>
      </template>

    </SfHeader>
    <SearchResults :visible="isSearchOpen" :result="result" @close="closeSearch"
      @removeSearchResults="removeSearchResults" />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import SfHeader from "../ui/components/organisms/SfHeader/SfHeader.vue";
import SfImage from "../ui/components/atoms/SfImage/SfImage.vue";
import SfIcon from "../ui/components/atoms/SfIcon/SfIcon.vue";
import SfButton from "../ui/components/atoms/SfButton/SfButton.vue";
import SfBadge from "../ui/components/atoms/SfBadge/SfBadge.vue";
import SfSearchBar from "../ui/components/molecules/SfSearchBar/SfSearchBar.vue";
import SfOverlay from "../ui/components/atoms/SfOverlay/SfOverlay.vue";
import SfMobileMenu from "../ui/components/organisms/SfMobileMenu/SfMobileMenu.vue";

import useUiState from '../composables/useUiState';
import { useCart, useUser, cartGetters, useProduct, useCategory } from '@realtainment/sylius';
import { computed, ref, onBeforeUnmount, watch, onMounted } from '@vue/composition-api';
import useUiHelpers from '../composables/useUiHelpers';
import LocaleSelector from './LocaleSelector';
import SearchResults from '../components/SearchResults.vue';
import HeaderNavigation from './HeaderNavigation';
import { clickOutside } from '../ui/utilities/directives/click-outside/click-outside-directive';
import { mapMobileObserver, unMapMobileObserver } from '../ui/utilities/mobile-observer';
import { mapMenuObserver, unMapMenuObserver } from "../ui/utilities/menu-observer";
import debounce from 'lodash.debounce';

import headerLogo from "../assets/logo.svg";
import headerLogoSymbol from "../assets/logo-symbol.svg";
import {
  logoBaseWidth,
  logoBaseHeight,
  reducedLogoWidth,
  reducedLogoHeight,
  useMobileSearch,
  useMenuText
} from "../ui/config";

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    HeaderNavigation,
    SfMobileMenu
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { search: searchProducts, products: searchProductsResults } = useProduct('AppHeader');
    const { search: searchCategories, categories: searchCategoriesResults } = useCategory('AppHeader');
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, isMobileMenuOpen, toggleWindowWidthChanged } = useUiState();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart } = useCart();
    const term = ref(getFacetsFromURL().phrase);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const isMobile = ref(mapMobileObserver().isMobile.get());
    loadUser();

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        const localeAccountPath = root.localePath({ name: 'my-account' });
        return root.$router.push(localeAccountPath);
      }

      toggleLoginModal();
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }

      await Promise.all([
        searchProducts({ search: term.value }),
        searchCategories({ categoryName: term.value })
      ]);

      result.value = {
        products: searchProductsResults.value.products,
        categories: searchCategoriesResults.value
      };
    }, 1000);

    const closeOrFocusSearchBar = () => {
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };

    watch(() => term.value, (newVal, oldVal) => {
      const shouldSearchBeOpened = (term.value.length > 0) && ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false));
      if (shouldSearchBeOpened) {
        isSearchOpen.value = true;
      }
    });

    const removeSearchResults = () => {
      result.value = null;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
      unMapMenuObserver();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWindowWidthChanged,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      isMobileMenuOpen,
      removeSearchResults,
      headerLogo,
      headerLogoSymbol,
      useMenuText,
      logoBaseWidth,
      logoBaseHeight,
      reducedLogoWidth,
      reducedLogoHeight,
      useMobileSearch,
    };
  },
  computed: {
    ...mapMenuObserver(),
  },
};
</script>

<style lang="scss" scoped>
.sf-header {
  &__logo-image {
    height: 100%;
  }

  & .sf-mobile_cart {
    --button-padding: var(--spacer-2xs) var(--spacer-sm);
    --button-background: var(--_c-gray-primary);
    margin-left: var(--spacer-2xs);
  }

  & .sf-mobile_search {
    --button-padding: var(--spacer-2xs) var(--spacer-sm);
    --button-background: var(--c-white);
    margin-left: var(--spacer-2xs);
  }
}

.header-on-top {
  z-index: 2;
}

.nav-item {
  --header-navigation-item-margin: 0 0;

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 70%;
}
</style>
