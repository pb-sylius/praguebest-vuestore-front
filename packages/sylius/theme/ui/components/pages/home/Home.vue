<template>
  <div id="home">
    <SfHero class="hero">
      <SfHeroItem
        v-for="(img, index) in heroes"
        :key="index"
        :image="img.image"
        :title="img.title"
        :subtitle="img.subtitle"
        :button-text="img.buttonText"
        :background="img.background"
        :class="img.className"
      />
    </SfHero>
    <SfBannerGrid class="banner-grid">
      <template v-for="banner in banners" #[banner.slot]>
        <SfBanner
          :key="banner.slot"
          :title="banner.title"
          :subtitle="banner.subtitle"
          :description="banner.description"
          :button-text="banner.buttonText"
          :image="banner.image"
          :class="banner.class"
        >
          <template #title>
            <SfHeading
              :title="banner.title"
              :level="2"
              class="sf-heading--no-underline sf-heading--left sf-banner__title"
            />
          </template>
          <template #subtitle>
            <span class="banner-grid__subtitle">{{ banner.subtitle }}</span>
          </template>
        </SfBanner>
      </template>
    </SfBannerGrid>
    <SfCallToAction
      class="call-to-action"
      title="Subscribe to Newsletters"
      description="Be aware of upcoming sales and events. Receive gifts and special offers!"
      button-text="subscribe"
      image="/assets/storybook/Home/newsletter.jpg"
    />
    <div class="match-with-it">
      <p class="match-with-it__paragraph">Match with it</p>
      <SfButton class="sf-button--text smartphone-only">See all</SfButton>
    </div>
    <SfCarousel
      :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      class="carousel"
    >
      <SfCarouselItem
        v-for="(product, index) in products"
        :key="index"
        class="carousel__item"
      >
        <SfProductCard
          :image="product.image"
          :title="product.title"
          :regular-price="product.price.regular"
          :special-price="product.price.special"
          :score-rating="product.rating.score"
          :max-rating="product.rating.max"
          :is-in-wishlist="product.isInWishlist"
          :show-add-to-cart-button="true"
          :reviews-count="product.reviews"
          :badge-label="product.badgeLabel"
          :badge-color="product.badgeColor"
          @click:wishlist="toggleWishlist(index)"
        />
      </SfCarouselItem>
    </SfCarousel>
    <SfSection
      title-heading="Share Your Look"
      subtitle-heading="#YOURLOOK"
      class="share-your-look"
    >
      <div class="instagram-grid">
        <div class="grid__row">
          <div class="grid__col">
            <SfImage
              v-if="isMobile"
              :src="instagramLayoutImages.imageAm"
              alt="katherina_trn"
              :width="140"
              :height="140"
              >katherina_trn</SfImage
            >
            <SfImage
              v-else
              :src="instagramLayoutImages.imageAd"
              alt="katherina_trn"
              :width="470"
              :height="470"
              >katherina_trn</SfImage
            >
          </div>
          <div class="grid__col small">
            <SfImage
              v-if="isMobile"
              :src="instagramLayoutImages.imageBm"
              alt="katherina_trn"
              :width="140"
              :height="140"
              >katherina_trn</SfImage
            >
            <SfImage
              v-else
              :src="instagramLayoutImages.imageCd"
              alt="katherina_trn"
              :width="470"
              :height="160"
              >katherina_trn</SfImage
            >
          </div>
        </div>
        <div class="grid__row gap">
          <div class="grid__col small">
            <SfImage
              v-if="isMobile"
              :src="instagramLayoutImages.imageCm"
              alt="katherina_trn"
              :width="140"
              :height="140"
              >katherina_trn</SfImage
            >
            <SfImage
              v-else
              :src="instagramLayoutImages.imageBd"
              alt="katherina_trn"
              :width="470"
              :height="160"
              >katherina_trn</SfImage
            >
          </div>
          <div class="grid__col">
            <SfImage
              v-if="isMobile"
              :src="instagramLayoutImages.imageDm"
              alt="katherina_trn"
              :width="140"
              :height="140"
              >katherina_trn</SfImage
            >
            <SfImage
              v-else
              :src="instagramLayoutImages.imageDd"
              alt="katherina_trn"
              :width="470"
              :height="470"
              >katherina_trn</SfImage
            >
          </div>
        </div>
      </div>
    </SfSection>
    <SfBanner
      class="app-banner desktop-only"
      subtitle="fashion to take away"
      :image="bannerAppImg"
      data-testid="application-banner"
    >
      <template #title>
        <span class="app-banner__title"
          >Download our application to your mobile</span
        >
      </template>
    </SfBanner>
  </div>
</template>

<script>
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfHero from "../../organisms/SfHero/SfHero.vue";
import SfBannerGrid from "../../organisms/SfBannerGrid/SfBannerGrid.vue";
import SfBanner from "../../molecules/SfBanner/SfBanner.vue";
import SfCallToAction from "../../molecules/SfCallToAction/SfCallToAction.vue";
import SfSection from "../../molecules/SfSection/SfSection.vue";
import SfCarousel from "../../organisms/SfCarousel/SfCarousel.vue";
import SfProductCard from "../../organisms/SfProductCard/SfProductCard.vue";
import SfImage from "../../atoms/SfImage/SfImage.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";

import heroImg from "../../../assets/img/hero.png";
import bannerHMImg from "../../../assets/img/bannerHM.jpg";
import bannerFImg from "../../../assets/img/bannerF.jpg";
import bannerEImg from "../../../assets/img/bannerE.jpg";
import bannerCImg from "../../../assets/img/bannerC.jpg";
import bannerGImg from "../../../assets/img/bannerG.jpg";
import bannerAppImg from "../../../assets/img/bannerApp.png";
import productEImg from "../../../assets/img/productE.jpg";
import productFImg from "../../../assets/img/productF.jpg";
import imageAd from "../../../assets/img/imageAd.webp";
import imageAm from "../../../assets/img/imageAm.webp";
import imageBd from "../../../assets/img/imageBd.webp";
import imageBm from "../../../assets/img/imageBm.webp";
import imageCd from "../../../assets/img/imageCd.webp";
import imageCm from "../../../assets/img/imageCm.webp";
import imageDd from "../../../assets/img/imageDd.webp";
import imageDm from "../../../assets/img/imageDm.webp";


import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../../../utilities/mobile-observer";

export default {
  name: "Home",
  components: {
    SfButton,
    SfHero,
    SfBannerGrid,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfHeading,
  },
  data() {
    return {
      instagramLayoutImages: {
        imageAd: imageAd,
        imageAm: imageAm,
        imageBd: imageBd,
        imageBm: imageBm,
        imageCd: imageCd,
        imageCm: imageCm,
        imageDd: imageDd,
        imageDm: imageDm
      },
      bannerAppImg: bannerAppImg,
      headingTitle: {
        mobile: "Match it with",
        desktop: "Bestsellers",
      },
      heroes: [
        {
          title: "Colorful summer dresses are already in store",
          subtitle: "SUMMER COLLECTION 2020",
          buttonText: "Learn more",
          background: "rgb(236, 239, 241)",
          image: heroImg,
        },
        {
          title: "Colorful summer dresses are already in store",
          subtitle: "SUMMER COLLECTION 2020",
          buttonText: "Learn more",
          background: "rgb(239, 235, 233)",
          image: bannerHMImg,
          className:
            "sf-hero-item--position-bg-top-left sf-hero-item--align-right",
        },
        {
          title: "Colorful summer dresses are already in store",
          subtitle: "SUMMER COLLECTION 2020",
          buttonText: "Learn more",
          background: "rgb(236, 239, 241)",
          image: heroImg,
        },
      ],
      banners: [
        {
          slot: "banner-A",
          subtitle: "Dresses",
          title: "Cocktail & Party",
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: "Shop now",
          image: bannerFImg,
          class: "desktop-only",
        },
        {
          slot: "banner-B",
          subtitle: "Dresses",
          title: "Linen Dresses",
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: "Shop now",
          image: bannerEImg,
          class: "desktop-only",
        },
        {
          slot: "banner-C",
          subtitle: "T-Shirts",
          title: "The Office Life",
          image: bannerCImg,
        },
        {
          slot: "banner-D",
          subtitle: "Summer Sandals",
          title: "Eco Sandals",
          image: bannerGImg,
        },
      ],
      products: [
        {
          title: "Cream Beach Bag",
          image: productEImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: true,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productFImg,
          price: { regular: "$ 50.00 ", special: "$ 25.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: true,
          reviews: 8,
          badgeLabel: "-50%",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productEImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productFImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productEImg,
          price: { regular: "$ 50.00 ", special: "$ 45.00" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "-10%",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productFImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productEImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
        {
          title: "Cream Beach Bag",
          image: productFImg,
          price: { regular: "$ 50.00 " },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
          reviews: 8,
          badgeLabel: "",
          badgeColor: "color-primary",
        },
      ],
    };
  },
  computed: {
    ...mapMobileObserver(),
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
  methods: {
    toggleWishlist(index) {
      return (this.products[index].isInWishlist =
        !this.products[index].isInWishlist);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles.scss";
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.hero {
  --hero-item-background-position: center;
}
.match-with-it {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: var(--spacer-xl);
  font-size: var(--h3-font-size);
  font-family: var(--font-family--secondary);
  font-weight: var(--font-weight--bold);
  border-bottom: solid 1px var(--c-light);
  &__paragraph {
    margin-bottom: var(--spacer-xs);
  }
  @include for-desktop {
    border: none;
    justify-content: center;
    font-weight: var(--font-weight--semibold);
  }
}
.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}
.banner-grid {
  margin: var(--spacer-base) 0;
  --banner-container-width: 50%;
  &__subtitle {
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    font-family: var(--font-family--secondary);
    color: var(--c-gray);
    text-transform: uppercase;
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}
.share-your-look {
  --heading-title-font-weight: var(--font-weight--semibold);
  @include for-desktop {
    --section-margin: var(--spacer-2xl) 0;
  }
}
.call-to-action {
  display: flex;
}
.instagram-grid {
  display: flex;
  max-height: 20.625rem;
  width: 100%;
  justify-content: center;
  margin: 0;
  @include for-desktop {
    max-height: 40.625rem;
    max-width: 60rem;
    margin: 0 auto;
  }
  &__row {
    display: flex;
    flex-direction: column;
  }
  .gap {
    margin-left: var(--spacer-xs);
    @include for-desktop {
      margin-left: var(--spacer-sm);
    }
  }
  &__col {
    width: 10rem;
    height: 10rem;
    @include for-desktop {
      &.small {
        height: 10rem;
      }
      width: 29.375rem;
      height: 29.375rem;
    }
    & + & {
      margin-top: var(--spacer-xs);
      @include for-desktop {
        margin-top: var(--spacer-sm);
      }
    }
  }
}
.app-banner {
  --banner-container-width: 100%;
  --banner-padding: 0 var(--spacer-2xl);
  --banner-subtitle-font-size: var(--font-size--xl);
  --banner-subtitle-font-weight: var(--font-weight--medium);
  --banner-subtitle-text-transform: capitalize;
  &__title {
    margin: var(--spacer-base) 0 var(--spacer-xl) 0;
    font-size: var(--h1-font-size);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--semibold);
    text-transform: capitalize;
  }
  display: block;
  min-height: 26.25rem;
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 calc(25% + var(--spacer-2xl)) 0 var(--spacer-xl);
  &__call-to-action {
    --button-background: transparent;
    display: flex;
  }
  &__button {
    --image-width: 8.375rem;
    --image-height: 2.75rem;
    --button-padding: 0;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
    }
  }
}
</style>

<include-source />
