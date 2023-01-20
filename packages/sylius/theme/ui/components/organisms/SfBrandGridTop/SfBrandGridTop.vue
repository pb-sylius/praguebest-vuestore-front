<template>
    <div class="top_brand_wrapper">
      <SfHeading :level="2" :title="$t('Top Brands')" class="brand_heading" />
      <div class="top_brand_grid">
        <SfBrandTile v-for="(brand, i) in brands" :key="i"
          :slug="brandGetters.getSlug(brand)" :name="brandGetters.getName(brand)"
          :image="brandGetters.getCoverImage(brand)">
        </SfBrandTile>
      </div>
    </div>
</template>

<script>
import SfBrandTile from "../../molecules/SfBrandTile/SfBrandTile.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

import { brandGetters } from '@realtainment/sylius';

export default {
  name: "SfBrandGridTop",
  setup() {
    return {
      brandGetters,
    }
  },
  props: {
    brands: {
      type: Array
    }
  },
  components: {
    SfBrandTile,
    SfHeading
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style lang="scss">
@import "./SfBrandGridTop.scss";
</style>
