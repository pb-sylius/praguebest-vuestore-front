<template>
  <div>
    <SfHeading :level="2" :title="$t('Manufacturers')" class="manufacturer_heading" />
    <SfManufacturerGrid :manufacturers="manufacturers" />
  </div>
</template>

<script>

import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfManufacturerTile from "../ui/components/molecules/SfManufacturerTile/SfManufacturerTile.vue";
import SfManufacturerGrid from "../ui/components/atoms/SfManufacturerGrid/SfManufacturerGrid.vue";

import { onSSR } from '@vue-storefront/core';
import {
  useManufacturer,
  manufacturerGetters
} from '@realtainment/sylius';

export default {
  name: 'ManufacturerAll',
  setup() {
    const { manufacturers, all, loading } = useManufacturer('manufacturer');

    onSSR(async () => {
      await all({});
    });

    return {
      manufacturers,
      loading,
      manufacturerGetters
    }
  },
  components: {
    SfHeading,
    SfManufacturerTile,
    SfManufacturerGrid
  }
}
</script>

<style lang="scss" scoped>
@import "../ui/styles/helpers";

.manufacturer_heading {
  margin-bottom: 20px;
}

</style>
