<template functional>
  <div
    :class="[data.class, data.staticClass, 'sf-property']"
    :style="[data.style, data.staticStyle]"
  >
    <span class="sf-property__name">
      {{ props.name }}
    </span>
    <SfLink class="sf-property__value" :link="props.link">
      {{ props.value }}
    </SfLink>
  </div>
</template>

<script>
import SfLink from '../../atoms/SfLink/SfLink.vue';

export default {
  name: "SfPropertyLink",
  components: {
    SfLink,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    link: {
      type: String,
      default: "/"
    }
  },
};
</script>

<style lang="scss">
@import "./SfPropertyLink.scss";
</style>
