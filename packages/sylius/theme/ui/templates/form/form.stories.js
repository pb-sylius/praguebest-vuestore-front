import FormComponent from "./Form";
import { Meta, Props, Preview, Story } from "@storybook/addon-docs";
import { story, params } from "../../utilities/story";
import SfInput from "../../atoms/SfInput/SfInput.vue";
import SfComponentSelect from "../../molecules/SfComponentSelect/SfComponentSelect.vue";
import SfButton from "../../atoms/SfButton/SfButton.vue";
import SfTextarea from "../../atoms/SfTextarea/SfTextarea.vue";
import SfHeading from "../../atoms/SfHeading/SfHeading.vue";
import SfRange from "../../molecules/SfRange/SfRange.vue";

export default {
  title: "Components/Templates/Form",
  component: FormComponent,
  argTypes: {},
  docs: {
    source: {
      type: "dynamic",
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { FormComponent, SfInput, SfComponentSelect, SfButton, SfTextarea, SfHeading, SfRange },
  props: Object.keys(argTypes),
  methods: {
    validate() {
      this.firstNameBlur = false;
      this.lastNameBlur = false;
      this.streetNameBlur = false;
      this.apartmentBlur = false;
      this.cityBlur = false;
      this.zipCodeBlur = false;
      this.countryBlur = false;
      this.phoneNumberBlur = false;
      this.emailBlur = false;
      this.messageBlur = false;
      if (
        this.validEmail(this.email) &&
        this.validPhoneNumber(this.phoneNumber) &&
        this.validFirstName(this.firstName) &&
        this.validLastName(this.lastName) &&
        this.validStreetName(this.streetName) &&
        this.validApartment(this.apartment) &&
        this.validCity(this.city) &&
        this.validZipCode(this.zipCode) &&
        this.validCountry(this.country) &&
        this.validMessage(this.message)
      ) {
        this.valid = true;
      }
    },
    validFirstName(firstName) {
      return firstName.length > 2;
    },
    validLastName(lastName) {
      return lastName.length > 2;
    },
    validStreetName(streetName) {
      return streetName.length > 2;
    },
    validApartment(apartment) {
      const regex = /^[0-9]/;
      return regex.test(apartment);
    },
    validCity(city) {
      return !!city && city.length > 2;
    },
    validZipCode(zipCode) {
      const regex = /^[0-9]/;
      return regex.test(zipCode);
    },
    validCountry(country) {
      return !!country;
    },
    validPhoneNumber(phone) {
      const regex = /^[0-9]{9}$/;
      return regex.test(phone);
    },
    validEmail(email) {
      const regex = /(.+)@(.+){2,}\.(.+){2,}/;
      return regex.test(email.toLowerCase());
    },
    validMessage(message) {
      return !!message && message.length > 10 && message.length <= 400;
    },
    submit() {
      this.validate();
      if (this.valid) {
        this.submitted = true;
      }
    },
    reset() {
      this.email = "";
      this.phoneNumber = "";
      this.zipCode = "";
      this.country = "";
      this.streetName = "";
      this.city = "";
      this.lastName = "";
      this.firstName = "";
      this.apartment = "";
      this.message = "";
    },
  },
  data() {
    return {
      valid: false,
      submitted: false,
      firstName: "",
      firstNameBlur: true,
      lastName: "",
      lastNameBlur: true,
      streetName: "",
      streetNameBlur: true,
      apartment: "",
      apartmentBlur: true,
      city: "",
      cityBlur: true,
      state: "",
      stateBlur: true,
      zipCode: "",
      zipCodeBlur: true,
      country: "",
      countryBlur: true,
      phoneNumber: "",
      phoneNumberBlur: true,
      email: "",
      emailBlur: true,
      countries: [
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "The Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City",
      ],
      message: "",
      messageBlur: true,
      range: [0, 1],
      rangeConfig: {
        start: [0, 1],
        range: {
          min: 0,
          max: 10,
        },
        step: 1,
        connect: true,
        direction: "ltr",
        orientation: "horizontal",
        behaviour: "tap-drag",
        tooltips: true,
        keyboardSupport: true,
        format: {
          to: function (range) {
            return new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(range);
          },
          from: function (range) {
            const parsedValue = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).formatToParts(range);
            return parsedValue[0].value;
          },
        },
      },
    };
  },
  template: `
    <div id="form-template">
    <form class="form">
      <SfInput
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
        error-message="Please type your name"
        @blur="firstNameBlur = false"
      />
      <SfInput
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        error-message="Please type your last name. Your name should have at least one character."
        @blur="lastNameBlur = false"
      />
      <SfInput
        label="Street name"
        name="streetName"
        class="form__element form__element--half"
        required
        error-message="Please type your street name"
        @blur="streetNameBlur = false"
      />
      <SfInput
        label="House/Apartment number"
        type="number"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        error-message="Please type your apartment/house number."
        @blur="apartmentBlur = false"
      />
      <SfInput
        label="City"
        name="city"
        class="form__element"
        required
        error-message="Please type your city."
        @blur="cityBlur = false"
      />
      <SfInput
        label="Zip-code"
        name="zipCode"
        type="number"
        class="form__element form__element--half"
        required
        error-message="Please type your zip code. Zipcode should have only numbers."
        @blur="zipCodeBlur = false"
      />
      <SfComponentSelect
        label="Country"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        required
        error-message="Please choose your country."
        @blur="countryBlur = false"
      >
        <SfComponentSelectOption
          v-for="countryOption in countries"
          :key="countryOption"
          :value="countryOption"
        >
          {{ countryOption }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfInput
        label="Phone number"
        name="phone"
        type="number"
        class="form__element form__element--half"
        required
        error-message="Please type your phone number."
        @blur="phoneNumberBlur = false"
      />
      <SfInput
        label="Email"
        name="email"
        class="form__element form__element--half form__element--half-even"
        required
        error-message="Please enter a valid email address."
        @blur="emailBlur = false"
      />
      <SfHeading title="Prices" level=5 />
      <SfRange
        class="form__element--range"
        :config="rangeConfig"
      />
      <SfTextarea
        v-model="message"
        class="form__element"
        label="Message"
        name="message"
        cols="80"
        rows="25"
        maxlength="400"
        minlength="10"
        wrap="soft"
        :readonly="true"
        placeholder="type a message"
        required
        error-message="Please type minimum 10 characters and maximum 400."
        @blur="messageBlur = false"
      >
      </SfTextarea>
      <div class="form__action">
        <SfButton type="submit" @click.prevent="submit">Submit</SfButton>
        <SfButton
          class="
            sf-button--text
            form__action-button form__action-button--secondary
          "
          @click="reset"
          >Reset</SfButton
        >
      </div>
    </form>
  </div>`
});

export const Common = Template.bind({});
Common.args = {};
Common.parameters = {
  docs: {
    source: {
      type: "dynamic",
    },
  },
};
