<template>
  <div class="sf-top-bar">
    <div class="sf-top-bar__container padded_content">
      <div class="sf-top-bar__left">
        <slot name="left" />
      </div>
      <div class="sf-top-bar__center">
        <slot name="center" />
      </div>
      <div class="sf-top-bar__right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SFTopBar",
};
</script>

<style lang="scss">
@import "./SfTopBar.scss";
</style>
