<template>
  <component
    :is="linkComponentTag"
    v-focus v-bind="urlTag"
    class="sf-link"
    :class="className"
    v-on="$listeners">
    <slot />
  </component>
</template>

<script>
import { focus } from "../../../utilities/directives/index";

export default {
  name: "SfLink",
  directives: { focus },
  props: {
    link: {
      type: [String, Object],
      default: "",
    },
    className: {
      type: String,
      default: ""
    },
  },
  computed: {
    console: () => console,
    window: () => window,
    isExternal() {
      return (
        typeof this.link === "string" && this.link.search(/(^\/|^#)/g) === -1
      );
    },
    isNativeLinkTag() {
      return this.isExternal || !this.$router;
    },
    urlTag() {
      return this.isNativeLinkTag ? { href: this.link } : { to: this.link };
    },
    linkComponentTag() {
      const routerLink = this.$nuxt ? "nuxt-link" : "router-link";
      return this.isNativeLinkTag ? "a" : routerLink;
    },
  },
};
</script>

<style lang="scss">
@import "./SfLink.scss";
</style>
