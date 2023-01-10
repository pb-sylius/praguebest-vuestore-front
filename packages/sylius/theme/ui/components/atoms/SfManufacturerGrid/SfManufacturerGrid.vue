<template>
  <div class="manufacturer_grid">
    <SfManufacturerTile
        v-for="(manufacturer, i) in manufacturers.manufacturers"
        v-bind:key="i"
        :slug="manufacturerGetters.getSlug(manufacturer)"
        :name="manufacturerGetters.getName(manufacturer)"
        :image="manufacturerGetters.getCoverImage(manufacturer)"
      />
  </div>
</template>

<script>
import SfManufacturerTile from "../../molecules/SfManufacturerTile/SfManufacturerTile.vue";

import {
  manufacturerGetters
} from '@realtainment/sylius';

export default {
  name: "SfManufacturerGrid",
  setup() {
    return {
      manufacturerGetters
    }
  },
  props: {
    manufacturers: {
      type: Object,
      default: {}
    }
  },
  components: {
    SfManufacturerTile
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style lang="scss">
@import "./SfManufacturerGrid.scss";
</style>
