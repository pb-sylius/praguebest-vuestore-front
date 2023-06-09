<template>
  <div id="product" class="padded_content">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" class="product__gallery" />
      </LazyHydrate>

      <div class="product__info" v-if="product">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
          />
          <div>
            <div class="product__rating">
              <SfRating
                :score="averageRating"
                :max="5"
              />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
          </div>
        </div>
        <div>
        <SfPropertyLink
          v-if="product.manufacturer"
          name="Manufacturer"
          :link="localePath(`/manufacturer/${product.manufacturer.slug}`)"
          :value="product.manufacturer.name"
        >
        </SfPropertyLink>
        </div>
        <div>
        <SfPropertyLink
          v-if="product.brand"
          name="Brand"
          :link="localePath(`/brand/${product.brand.slug}`)"
          :value="product.brand.name"
        >
        </SfPropertyLink>
        </div>
        <div>
          <p class="product__description desktop-only">
            {{ product.shortDescription }}
          </p>
          <SfSelect
            v-for="(item, key) in Object.keys(options)"
            :key="key"
            :value="configuration[item]"
            @input="value => updateFilter({ value, filter: item })"
            :label="options[item].label"
            class="sf-select--underlined product__select-size"
            :required="true"
          >
            <SfSelectOption
              v-for="size in options[item].value"
              :key="size.value"
              :value="size.value"
            >
              {{size.label}}
            </SfSelectOption>
          </SfSelect>

          <div v-if="options.color && options.color.length > 1" class="product__colors desktop-only">
            <p class="product__color-label">{{ $t('Color') }}:</p>
            <SfColor
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product__color"
              @click="updateFilter({color})"
            />
          </div>
          <SfColorPicker
            :class="{ 'display-none': !colors.length }"
            class="sf-product-card__colors"
            label="Choose color"
            :is-open="openColorPicker"
          >
            <SfColor
              v-for="(color, i) in colors"
              :key="color.value"
              :color="color.color"
              :selected="color.selected"
              class="sf-product-card__color"
              :class="{ 'display-none': i > 3 && showBadge }"
            />
            <SfBadge
              v-if="showBadge"
              class="sf-product-card__colors-badge color-secondary"
            >
              {{ `+${colors.length - 4}` }}
            </SfBadge>
          </SfColorPicker>
          <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="product.selectedVariant.onHand"
            v-model="qty"
            :disabled="loading || product.selectedVariant.onHand === 0"
            class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty) })"
          />
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab title="Description" key="description">
              <div class="product__description">
                  {{ product.description }}
              </div>
              <SfProperty
                v-for="(property, i) in properties"
                :key="i"
                :name="property.name"
                :value="property.value"
                class="product__property"
              >
                <template v-if="property.name === 'Category'" #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ property.value }}
                  </SfButton>
                </template>
              </SfProperty>
            </SfTab>
            <SfTab v-if="Array.isArray(reviews) && reviews.length" title="Read reviews" key="read_reviews">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab>
            <SfTab v-if="isAuthenticated" title="Add review" key="add_review">
              <add-review-form
                :product-id="product.id"
                @submit="handleReviewSubmit"
              />
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>

  </div>
</template>

<script>
import SfProperty from "../ui/components/atoms/SfProperty/SfProperty.vue";
import SfHeading from "../ui/components/atoms/SfHeading/SfHeading.vue";
import SfPrice from "../ui/components/atoms/SfPrice/SfPrice.vue";
import SfRating from "../ui/components/atoms/SfRating/SfRating.vue";
import SfSelect from "../ui/components/molecules/SfSelect/SfSelect.vue";
import SfAddToCart from "../ui/components/molecules/SfAddToCart/SfAddToCart.vue";
import SfTabs from "../ui/components/organisms/SfTabs/SfTabs.vue";
import SfGallery from "../ui/components/molecules/SfGallery/SfGallery.vue";
import SfIcon from "../ui/components/atoms/SfIcon/SfIcon.vue";
import SfImage from "../ui/components/atoms/SfImage/SfImage.vue";
import SfBanner from "../ui/components/molecules/SfBanner/SfBanner.vue";
import SfAlert from "../ui/components/molecules/SfAlert/SfAlert.vue";
import SfSticky from "../ui/components/molecules/SfSticky/SfSticky.vue";
import SfReview from "../ui/components/molecules/SfReview/SfReview.vue";
import SfBreadcrumbs from "../ui/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue";
import SfButton from "../ui/components/atoms/SfButton/SfButton.vue";
import SfColor from "../ui/components/atoms/SfColor/SfColor.vue";
import SfColorPicker from "../ui/components/molecules/SfColorPicker/SfColorPicker.vue";
import SfBadge from "../ui/components/atoms/SfBadge/SfBadge.vue";
import SfLink from "../ui/components/atoms/SfLink/SfLink.vue";
import SfPropertyLink from "../ui/components/molecules/SfPropertyLink/SfPropertyLink.vue";

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import AddReviewForm from '~/components/Product/AddReviewForm.vue';
import { ref, computed } from '@vue/composition-api';
import { useProduct, useCart, productGetters, useReview, reviewGetters, useUser } from '@realtainment/sylius';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Product',
  transition: 'fade',
  props: {
    colors: {
      type: Array,
      default: () => [
        { label: "Sand", value: "sand", color: "#EDCBB9", selected: false },
        { label: "Mint", value: "mint", color: "#ABD9D8", selected: false },
        {
          label: "Light Gray",
          value: "light gray",
          color: "#F1F2F3",
          selected: false,
        },
        {
          label: "Vivid rose",
          value: "vivid rose",
          color: "#DB5593",
          selected: false,
        },
        { label: "Peach", value: "peach", color: "#F59F93", selected: false },
        {
          label: "Citrus",
          value: "citrus",
          color: "#FFEE97",
          selected: false,
        },
      ],
    },
  },
  setup(props, context) {
    const qty = ref(1);
    const { id, slug } = context.root.$route.params;
    const { isAuthenticated } = useUser();
    const { products, search } = useProduct('products');

    // const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const relatedProducts = computed(() => []);
    const relatedLoading = false;

    const { addItem, loading } = useCart();
    const { reviews: productReviews, search: searchReviews, addReview } = useReview('productReviews');

    const product = computed(() => {
      return products.value.products && productGetters.getFiltered(products.value.products, { master: true, attributes: context.root.$route.query })[0];
    });

    const options = computed(() => productGetters.getAttributes(products.value?.products, ['color', 'size'])) || [];
    const configuration = computed(() => productGetters.getAttributes(product?.value, ['color', 'size'])) || [];
    const categories = computed(() => productGetters.getCategoryIds(product?.value)) || [];
    const reviews = computed(() => reviewGetters.getItems(productReviews?.value)) || [];

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: img.small },
      desktop: { url: img.small },
      big: { url: img.small },
      alt: product?.value?.name
    })));

    onSSR(async () => {
      await search({ slug, query: context.root.$route.query});
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      await searchReviews({ productId: id });
    });

    const updateFilter = (item) => {
      const filterObj = {};
      filterObj[item.filter] = item.value;
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          ...configuration.value,
          ...filterObj
        }
      });
    };
    const handleReviewSubmit = async ({form, onComplete, onError}) => {
      try {
        await addReview(form.value);
        onComplete();
      } catch (e) {
        onError(e);
      }
    };

    const properties = computed(() => {
      return product.value?.attributes?.map(item => ({
        value: item.stringValue,
        name: item.name
      })) || [];
    });


    return {
      updateFilter,
      configuration,
      product,
      categories,
      properties,
      reviews,
      reviewGetters,
      price: computed(() => productGetters.getPrice(product.value)),
      averageRating: computed(() => productGetters.getAverageRating(product.value)),
      totalReviews: computed(() => reviewGetters.getTotalReviews(productReviews.value)),
      relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery,
      isAuthenticated,
      handleReviewSubmit,
      showBadge: false,
      openColorPicker: true,
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner,
    LazyHydrate,
    AddReviewForm,
    SfColorPicker,
    SfBadge,
    SfLink,
    SfPropertyLink,
  },
  data() {
    return {
      detailsIsActive: false,
      breadcrumbs: []
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
