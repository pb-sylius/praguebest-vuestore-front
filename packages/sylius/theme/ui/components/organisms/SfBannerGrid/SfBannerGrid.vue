<template>
  <div class="sf-banner-grid">
    <template v-if="bannerGrid === 1">
      <div class="sf-banner-grid__row">
          <div class="sf-banner-grid__col">
            <SfLink :link="link">
              <slot name="banner-A" />
            </SfLink>
          </div>
        <div class="sf-banner-grid__col sf-banner-grid__col--medium">
          <SfLink :link="link">
            <slot name="banner-B" />
          </SfLink>
        </div>
        <div class="sf-banner-grid__col">
          <div class="sf-banner-grid__row">
            <div class="sf-banner-grid__col">
              <SfLink :link="link">
                <slot name="banner-C" />
              </SfLink>
            </div>
          </div>
          <div class="sf-banner-grid__row">
            <div class="sf-banner-grid__col">
              <SfLink :link="link">
                <slot name="banner-D" />
              </SfLink>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="bannerGrid === 2">
      <div class="sf-banner-grid__row">
        <div class="sf-banner-grid__col sf-banner-grid__col--small">
          <SfLink :link="link">
            <slot name="banner-A" />
          </SfLink>
        </div>
        <div class="sf-banner-grid__col">
          <div class="sf-banner-grid__row">
            <div class="sf-banner-grid__col sf-banner-grid__col--higher">
              <SfLink :link="link">
                <slot name="banner-B" />
              </SfLink>
            </div>
            <div class="sf-banner-grid__col sf-banner-grid__col--higher">
              <slot name="banner-C" />
            </div>
          </div>
          <div class="sf-banner-grid__row">
            <div class="sf-banner-grid__col">
              <SfLink :link="link">
                <slot name="banner-D" />
              </SfLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SfLink from '../../atoms/SfLink/SfLink.vue';

export default {
  name: "SfBannerGrid",
  components: {
    SfLink
  },
  props: {
    bannerGrid: {
      type: Number,
      default: 1,
    },
    link: {
      type: String,
      default: '#'
    }
  },
};
</script>

<style lang="scss">
@import "./SfBannerGrid.scss";
</style>
