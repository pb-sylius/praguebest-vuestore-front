<template>
  <div class="sf-address-picker">
    <slot />
    <div class="shadow_element"></div>
  </div>
</template>

<script>
import SfAddress from "./_internal/SfAddress.vue";
import Vue from "vue";

Vue.component("SfAddress", SfAddress);

export default {
  name: "SfAddressPicker",
  model: {
    prop: "selected",
    event: "change",
  },
  props: {
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedValue: this.selected,
    };
  },
  provide() {
    return {
      getSelectedValue: this.getSelectedValue,
      setSelectedValue: this.setSelectedValue,
    };
  },
  watch: {
    selected(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
    getSelectedValue() {
      return this.selectedValue;
    },
    setSelectedValue(newVal) {
      const newValue = newVal;
      this.selectedValue = newValue;
      this.$emit("change", newValue);
    },
  },
};
</script>

<style lang="scss">
@import "./SfAddressPicker.scss";
</style>
