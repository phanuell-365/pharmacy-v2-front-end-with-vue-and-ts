<template>

  <hr class="my-3">

  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>

    <!--  name  -->
    <InputContainer :invalid-feedback="nameErrorMessage" input-id="name" input-label="name">
      <input
        id="validationName"
        v-model.trim="name"
        :class="{'is-invalid': !nameMeta.valid && nameMeta.validated}"
        class="form-control"
        name="name"
        required
        type="text"
      />
    </InputContainer>

    <!--  email  -->
    <InputContainer :invalid-feedback="emailErrorMessage" input-id="email" input-label="email">
      <input
        id="validationEmail"
        v-model.trim="email"
        :class="{'is-invalid': !emailMeta.valid && emailMeta.validated}"
        class="form-control"
        name="email"
        required
        type="email"
      />
    </InputContainer>

    <!-- phone   -->
    <InputContainer :invalid-feedback="phoneErrorMessage" input-id="phone" input-label="phone">
      <input
        id="validationPhone"
        v-model.trim="phone"
        :class="{'is-invalid': !phoneMeta.valid && phoneMeta.validated}"
        class="form-control"
        name="phone"
        required
        type="tel"
      />
    </InputContainer>

    <hr class="my-3">

    <FormButtonsContainer>
      <FormButton skin="primary" text="add" @click="onAddClick" />
      <FormButton skin="secondary" text="add & new" @click="onAddAndNewClick" />
      <FormButton outline skin="dark" text="add & view" @click="onAddAndView" />
      <FormButton outline skin="secondary" text="add & view all" @click="onAddAndViewAll" />
      <FormButton outline skin="danger" text="clear" @click="onClear" />
    </FormButtonsContainer>

    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" @on-hidden-bs-toast="onHiddenBsToast" />
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
import { ref } from "vue";
import moment from "moment";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { NewSupplierDto } from "@/stores/app/suppliers/dto";
import startCase from "lodash/startCase";

const router = useRouter();

const suppliersStore = useSuppliersStore();

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

const nameValidation = (value: string) => {
  if (!value)
    return "This field is required";

  return true;
};

const emailValidation = (value: string) => {
  if (!value)
    return "This field is required";

  return true;
};

const phoneValidation = (value: string) => {
  if (!value)
    return "This field is required";

  if (value.length < 10)
    return "The phone number should contain not less than 10 characters";

  if (value.length > 10)
    return "The phone number should contain not more than 10 characters";

  return true;
};

const { value: name, errorMessage: nameErrorMessage, meta: nameMeta } = useField("name", nameValidation);

const { value: email, errorMessage: emailErrorMessage, meta: emailMeta } = useField("email", emailValidation);

const { value: phone, errorMessage: phoneErrorMessage, meta: phoneMeta } = useField("phone", phoneValidation);

const validateForm = () => {
  if (nameMeta.valid && emailMeta.valid && phoneMeta.valid)
    return true;
  else {

    toastError.value?.setupToast({
      name: "Add Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Supplier Error",
      text: "Please fill in the required fields",
      delay: 5000
    });

    toastError.value?.show();
  }
};

const createSupplierPayload = () => {
  const payload: NewSupplierDto = {
    name: startCase(name.value),
    email: email.value,
    phone: phone.value
  }

  return payload;
}

const addSupplier = async (payload: NewSupplierDto) => {
  try {
    const supplier = await suppliersStore.addSupplier(payload)

    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Supplier",
      text: "Added the supplier successfully!",
      delay: 3000
    });

    toastSuccess.value?.show();

    return supplier;
  } catch (error: any) {

    console.error(error);

    toastError.value?.setupToast({
      name: "Add Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Supplier Error",
      text: "Failed to add the supplier. " + error?.message,
      delay: 5000
    });

    toastError.value?.show();
  }
}

const routeRedirect = ref("");

const onAddClick = async () => {

  if (validateForm())
    await addSupplier(createSupplierPayload());
};

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addSupplier(createSupplierPayload());

    // select the form using the formRef
    const form = formRef.value as HTMLFormElement;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const stock = await addSupplier(createSupplierPayload());

    routeRedirect.value = `/stocks/${stock?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addSupplier(createSupplierPayload());

    routeRedirect.value = "/suppliers";
  }
};

const onClear = () => {

  // select the form using the formRef
  const form = formRef.value as HTMLFormElement;

  // call reset
  form?.reset();
};

const onHiddenBsToast = () => {
  if (routeRedirect.value === "current")
    router.go(0);

  router.push(routeRedirect.value);
};

</script>

<style scoped>

</style>
