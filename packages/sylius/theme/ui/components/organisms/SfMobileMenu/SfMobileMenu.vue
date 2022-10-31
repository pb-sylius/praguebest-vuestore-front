<template>
  <div class="sf-mobile_menu_wrapper" id="mobile-menu">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isHamburgerMenuOpen"
      :title="$t('Menu')"
      class="sf-sidebar--right"
      @close="toggleHamburgerMenu"
    >
      <div class="mobile-menu-item">
        <SfButton
          class="open-action"
          @click="toggleWishlistSidebar"
        >
          <span>{{$t('My Wishlist')}}</span>
          <SfChevron class="sf-chevron--right" />
        </SfButton>
      </div>
      <div class="mobile-menu-item">
        <SfButton
          class="open-action"
          @click="toggleLoginModal"
        >
          <span>{{$t('My Account')}}</span>
          <SfChevron class="sf-chevron--right" />
        </SfButton>
      </div>
      <div class="mobile-menu-item" v-for="(category, index) in categories" :key="index" :link="localePath(`/c/${category.slug}`)">
        <SfButton
          class="sf-button--pure"
          :link="localePath(`/c/${category.slug}`)"
        >
          <span>{{category.name}}</span>
          <SfChevron class="sf-chevron--right" />
        </SfButton>
      </div>
    </SfSidebar>
    <SfButton class="sf-mobile_menu"
      @click="toggleHamburgerMenu"
    >
      <SfIcon
          icon="mobile_menu"
          color="white"
          size="24px"
        />
        <span v-if="useMenuText" class="sf_mobile_menu_text">{{$t('MENU')}}</span>
    </SfButton>

  </div>
</template>

<script>
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfIcon from "../../atoms/SfIcon/SfIcon.vue";
import SfOverlay from "../../atoms/SfOverlay/SfOverlay.vue";
import SfSidebar from "../../organisms/SfSidebar/SfSidebar.vue";
import SfProperty from "../../atoms/SfProperty/SfProperty.vue";
import SfChevron from "../../atoms/SfChevron/SfChevron.vue";

import { mapMenuObserver } from "../../../utilities/menu-observer";
import useUiState from '../../../../composables/useUiState';
import { useMenuText } from "../../../config";
import { clickOutside } from "../../../utilities/directives";
import { useUser } from '@realtainment/sylius';
import { useCategory } from '@realtainment/sylius';

export default {

  name: "SfMobileMenu",

  directives: { clickOutside },

  components: {
    SfButton,
    SfIcon,
    SfOverlay,
    SfSidebar,
    SfProperty,
    SfChevron,
  },

  setup(props, { root }) {

    const { toggleHamburgerMenu, isHamburgerMenuOpen, toggleWishlistSidebar, toggleLoginModal } = useUiState();

    const { isAuthenticated, load: loadUser } = useUser();

    loadUser();

    const { categories } = useCategory('AppHeader:CategoryList');

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        const localeAccountPath = root.localePath({ name: 'my-account' });
        return root.$router.push(localeAccountPath);
      }

      toggleLoginModal();
    };

    return {
      useMenuText,
      isHamburgerMenuOpen,
      categories,
      toggleHamburgerMenu,
      toggleWishlistSidebar,
      handleAccountClick,
      toggleLoginModal,
    }
  },

  props: {
  },

  data() {
    return {
      isAddingToCart: false,
      openColorPicker: false,

    };
  },

  beforeDestroy() {
  },

  computed: {
    ...mapMenuObserver(),
  },
};
</script>
<style lang="scss">
@import "./SfMobileMenu.scss";
</style>
