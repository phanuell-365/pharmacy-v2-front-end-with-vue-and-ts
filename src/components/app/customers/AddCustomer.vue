<template>
  <form
    ref="formRef"
    autocomplete="off"
    class="row g-3 m-4"
    novalidate
    @submit.prevent
  >
    <!--  name  -->
    <InputContainer
      :invalid-feedback="nameErrorMessage"
      input-id="name"
      input-label="name"
    >
      <input
        id="validationName"
        v-model.trim="name"
        :class="{ 'is-invalid': !nameMeta.valid && nameMeta.validated }"
        class="form-control"
        name="name"
        required
        type="text"
      />
    </InputContainer>

    <!--  email  -->
    <InputContainer
      :invalid-feedback="emailErrorMessage"
      input-id="email"
      input-label="email"
    >
      <input
        id="validationEmail"
        v-model.trim="email"
        :class="{ 'is-invalid': !emailMeta.valid && emailMeta.validated }"
        class="form-control"
        name="email"
        required
        type="email"
      />
    </InputContainer>

    <!-- phone   -->
    <InputContainer
      :invalid-feedback="phoneErrorMessage"
      input-id="phone"
      input-label="phone"
    >
      <input
        id="validationPhone"
        v-model.trim="phone"
        :class="{ 'is-invalid': !phoneMeta.valid && phoneMeta.validated }"
        class="form-control"
        name="phone"
        required
        type="tel"
      />
    </InputContainer>

    <FormButtonsContainer class="mt-5">
      <FormButton skin="primary" text="Add" @click="onAddAndNewClick" />
      <!--      <FormButton skin="secondary" text="add & new" @click="onAddAndNewClick" />-->
      <FormButton outline skin="dark" text="Add & View" @click="onAddAndView" />
      <FormButton
        outline
        skin="secondary"
        text="Add & View All"
        @click="onAddAndViewAll"
      />
      <FormButton outline skin="danger" text="Clear" @click="onClear" />
    </FormButtonsContainer>

    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast
          ref="toastSuccess"
          skin="success"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </form>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { useField } from "vee-validate";
import { TOP_CENTER } from "@/constants/toasts";
import { useRouter } from "vue-router";
import { useCustomersStore } from "@/stores/app/customers/customers";
import { ref } from "vue";
import moment from "moment";
import type { NewCustomerDto } from "@/stores/app/customers/dto";
import startCase from "lodash/startCase";

const router = useRouter();

const customersStore = useCustomersStore();

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

const nameValidation = (value: string) => {
  if (!value) return "This field is required";

  return true;
};

const emailValidation = (value: string) => {
  if (!value) return "This field is required";

  return true;
};

const phoneValidation = (value: string) => {
  if (!value) return "This field is required";

  if (value.length < 10)
    return "The phone number should contain not less than 10 characters";

  if (value.length > 10)
    return "The phone number should contain not more than 10 characters";

  return true;
};

const {
  value: name,
  errorMessage: nameErrorMessage,
  meta: nameMeta,
} = useField("name", nameValidation);

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta,
} = useField("email", emailValidation);

const {
  value: phone,
  errorMessage: phoneErrorMessage,
  meta: phoneMeta,
} = useField("phone", phoneValidation);

const validateForm = () => {
  if (nameMeta.valid && emailMeta.valid && phoneMeta.valid) return true;
  else {
    toastError.value?.setupToast({
      name: "Add Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Customer Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createCustomerPayload = () => {
  const payload: NewCustomerDto = {
    name: startCase(name.value),
    email: email.value,
    phone: phone.value,
  };

  return payload;
};

const addCustomer = async (payload: NewCustomerDto) => {
  try {
    const customer = await customersStore.addCustomer(payload);

    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Customer",
      text: "Added the customer successfully!",
      delay: 3000,
    });

    toastSuccess.value?.show();

    return customer;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Add Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Customer Error",
      text: "Failed to add the customer. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

// const onAddClick = async () => {
//   if (validateForm()) await addCustomer(createCustomerPayload());
// };

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addCustomer(createCustomerPayload());

    // select the form using the formRef
    const form = formRef.value as HTMLFormElement;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const customer = await addCustomer(createCustomerPayload());

    routeRedirect.value = `/customers/${customer?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addCustomer(createCustomerPayload());

    routeRedirect.value = "/customers";
  }
};

const onClear = () => {
  // select the form using the formRef
  const form = formRef.value as HTMLFormElement;

  // call reset
  form?.reset();
};

const onHiddenBsToast = () => {
  router.push(routeRedirect.value);
};
</script>

<style scoped></style>
