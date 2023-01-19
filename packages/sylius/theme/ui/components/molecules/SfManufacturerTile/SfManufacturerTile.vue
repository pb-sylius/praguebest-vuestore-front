<template>
  <SfLink :link="`/manufacturer/${slug}`" :className="'manufacturer_tile_link'">
    <div class="manufacturer_tile_img_wrapper">
      <SfImage :src="image" :alt="name" ref='imgElement' />
    </div>
    <SfHeading :level="4" :title="name" class="manufacturer_tile_name"></SfHeading>
  </SfLink>

</template>

<script>
import SfLink from "../../atoms/SfLink/SfLink.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";
import SfImage from "../../atoms/SfImage/SfImage.vue";

export default {
  name: "SfManufacturerTile",
  components: {
    SfLink,
    SfHeading,
    SfImage,
  },
  setup(props) {
    console.log(props.image)
  },
  mounted() {
    /*
    pripraveno pro prepocitani velikosti log
    Object.keys(this.$refs).forEach(el => {
      console.log(this.$refs[el].$el)
      console.log(this.$refs[el].$el.clientHeight)
      console.log(this.$refs[el].$el.clientWidth)
    })
    */
  },
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    }
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style lang="scss">
@import "./SfManufacturerTile.scss";
</style>
