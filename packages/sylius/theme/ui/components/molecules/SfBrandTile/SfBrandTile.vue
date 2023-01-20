<template>
  <SfLink :link="`/brand/${slug}`" :className="'brand_tile_link'">
    <div class="brand_tile_img_wrapper">
      <SfImage :src="stripedImagePath" :alt="name" />
    </div>
    <SfHeading :level="4" :title="name" class="brand_tile_name"></SfHeading>
  </SfLink>

</template>

<script>
import SfLink from "../../atoms/SfLink/SfLink.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";
import SfImage from "../../atoms/SfImage/SfImage.vue";

export default {
  name: "SfBrandTile",
  components: {
    SfLink,
    SfHeading,
    SfImage,
  },
  setup(props) {
    const stripedImagePath = props.image.replaceAll('"', '');
    return {
      stripedImagePath
    }
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
@import "./SfBrandTile.scss";
</style>
