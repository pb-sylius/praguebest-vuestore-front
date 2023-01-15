<template>
    <div class="top_manufacturer_wrapper">
      <SfHeading :level="2" :title="$t('Top Manufacturers')" class="manufacturer_heading" />
      <div class="top_manufacturer_grid">
        <SfManufacturerTile v-for="(manufacturer, i) in manufacturers" :key="i"
          :slug="manufacturerGetters.getSlug(manufacturer)" :name="manufacturerGetters.getName(manufacturer)"
          :image="manufacturerGetters.getCoverImage(manufacturer)">
        </SfManufacturerTile>
      </div>
    </div>
</template>

<script>
import SfManufacturerTile from "../../molecules/SfManufacturerTile/SfManufacturerTile.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

import { manufacturerGetters } from '@realtainment/sylius';

export default {
  name: "SfManufacturerGridTop",
  setup() {
    return {
      manufacturerGetters,
    }
  },
  props: {
    manufacturers: {
      type: Array
    }
  },
  components: {
    SfManufacturerTile,
    SfHeading
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style lang="scss">
@import "./SfManufacturerGridTop.scss";
</style>
