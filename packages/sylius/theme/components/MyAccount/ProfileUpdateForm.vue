<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form class="form" @submit.prevent="handleSubmit(submitForm(reset))">
      <div class="form__horizontal">
        <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
          <SfInput
            v-model="form.firstName"
            name="firstName"
            label="First Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
          <SfInput
            v-model="form.lastName"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          name="gender"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'gender'"
            v-model="form.gender"
            label="Gender"
            name="gender"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="genderOption in genderOptions"
              :key="genderOption.key"
              :value="genderOption.key"
            >
              {{ genderOption.label }}
            </SfSelectOption>
          </SfSelect>

        </ValidationProvider>

        <ValidationProvider rules="required|min:9" v-slot="{ errors }" class="form__element">
          <SfInput
            v-model="form.phoneNumber"
            name="phoneNumber"
            label="Phone number"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>

      <div class="form__horizontal">
        <SfInput
          type="text"
          name="birthday"
          label="Birthday"
          class="form__element"
          :value="selectedBirthday"
          @input="handleBirthday"
        />
        <SfCheckbox
          v-e2e="'copy-address'"
          :selected="form.subscribedToNewsletter"
          @change="handleCheckSubscribedToNewsletter"
          :label="$t('Subscribed to newsletter')"
          name="subscribedToNewsletter"
          class="form__element"
        />
      </div>

      <ValidationProvider rules="required|email" v-slot="{ errors }" class="form__element">
        <SfInput
          v-model="form.email"
          type="email"
          name="email"
          label="Your e-mail"
          required
          disabled
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfButton class="form__button">{{ $t('Update personal data') }}</SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser, userGetters } from '@realtainment/sylius';
import SfInput from "../../ui/components/atoms/SfInput/SfInput.vue";
import SfButton from "../../ui/components/atoms/SfButton/SfButton.vue";
import SfSelect from "../../ui/components/molecules/SfSelect/SfSelect.vue";
import SfCheckbox from "../../ui/components/molecules/SfCheckbox/SfCheckbox.vue";
import moment from "moment";

export default {
  name: 'ProfileUpdateForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  setup(_, { emit }) {
    const { user } = useUser();
    const resetForm = () => ({
      firstName: userGetters.getFirstName(user.value),
      lastName: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
      gender: user.value.gender,
      birthday: user.value.birthday,
      phoneNumber: user.value.phoneNumber,
      subscribedToNewsletter: user.value.subscribedToNewsletter || false
    });
    const form = ref(resetForm());
    const selectedBirthday = ref('');
    const birthdayFromDb = ref('');
    const locale = ref('');

    const genderOptions = [
      { key: 'u', label: 'Unknown'},
      { key: 'm', label: 'Male'},
      { key: 'f', label: 'Female'}
    ];

    const handleBirthday = (val) => {
      if (val !== birthdayFromDb.value) {
        selectedBirthday.value = val;
        moment.locale(locale.value);
        const formated = moment(val, 'DD.MM.YYYY').locale('en').format('YYYY-MM-DD 00:00:00');
        form.value.birthday = formated;
        selectedBirthday.value = val;
      } else {
        moment.locale('en');
        const formated = moment(val, 'YYYY-MM-DD 00:00:00').format('DD.MM.YYYY');
        selectedBirthday.value = formated;
      }
    };
    const handleCheckSubscribedToNewsletter = (val) => {
      form.value.subscribedToNewsletter = val;
    };

    const submitForm = (resetValidationFn) => {
      return () => {
        const onComplete = () => {
          form.value = resetForm();
          resetValidationFn();
        };

        const onError = () => {
          // TODO: Handle error
        };

        emit('submit', { form, onComplete, onError });
      };
    };

    return {
      form,
      submitForm,
      handleCheckSubscribedToNewsletter,
      handleBirthday,
      selectedBirthday,
      genderOptions,
      locale,
      birthdayFromDb,
      user
    };
  },
  mounted: function() {
    this.locale = navigator.language;
    if (this.user.birthday) {
      const birthday = this.user.birthday.split('T');
      this.birthdayFromDb = birthday[0];
      this.handleBirthday(birthday[0]);
    }
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style lang='scss' scoped>
  .form {
    &__element {
      display: block;
      margin: 0 0 var(--spacer-lg) 0;
    }
    &__button {
      display: block;
      width: 100%;
      @include for-desktop {
        width: 17.5rem;
      }
    }
    &__horizontal {
      @include for-desktop {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .form__element {
        @include for-desktop {
          flex: 1;
          margin-right: var(--spacer-2xl);
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
