<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="My addresses">
          <ShippingDetails />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>

<script>
import SfBreadcrumbs from "../ui/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue";
import SfContentPages from "../ui/components/organisms/SfContentPages/SfContentPages.vue";

import { computed, onBeforeUnmount } from '@vue/composition-api';
import { useUser } from '@realtainment/sylius';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import OrderHistory from './MyAccount/OrderHistory';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '../ui/utilities/mobile-observer';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    OrderHistory,
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const { $router, $route } = context.root;
    const { logout } = useUser();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const activePage = computed(() => {
      const { pageName } = $route.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } else if (!isMobile.value) {
        return 'My profile';
      } else {
        return '';
      }
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        $router.push(context.root.localePath({ name: 'home' }));
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      $router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return { changeActivePage, activePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' }
        },
        {
          text: 'My Account',
          route: { link: '#' }
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
