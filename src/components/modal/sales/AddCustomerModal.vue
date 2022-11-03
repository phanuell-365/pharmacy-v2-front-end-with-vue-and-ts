<template>
  <form autocomplete="off" novalidate @submit.prevent>
    <div
      ref="addNewCustomerModalRef"
      aria-hidden="true"
      aria-labelledby="staticBackdrop"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <div id="staticBackdrop" class="modal-header p-2 border-bottom-0">
              <FontAwesome
                :icon-name="PATIENTS_ICON"
                class="mx-3 fa-2x text-primary"
              />
              <p class="fs-5 mb-0 text-dark">Add New Customer</p>
            </div>
            <button
              aria-label="Close"
              class="btn-close text-end mx-2"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body border-bottom-0">
            <div ref="formRef" class="row g-3 m-4">
              <!--  name  -->
              <InputContainer
                :invalid-feedback="nameErrorMessage"
                input-id="name"
                input-label="name"
              >
                <input
                  id="validationName"
                  v-model.trim="name"
                  :class="{
                    'is-invalid': !nameMeta.valid && nameMeta.validated,
                  }"
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
                  :class="{
                    'is-invalid': !emailMeta.valid && emailMeta.validated,
                  }"
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
                  :class="{
                    'is-invalid': !phoneMeta.valid && phoneMeta.validated,
                  }"
                  class="form-control"
                  name="phone"
                  required
                  type="tel"
                />
              </InputContainer>

              <FormButtonsContainer class="mt-5">
                <FormButton skin="primary" text="Add" @click="onAddClick" />
                <FormButton
                  skin="danger"
                  text="Cancel"
                  @click="onCancelClick"
                />
              </FormButtonsContainer>

              <Teleport to="body">
                <ToastContainer :placement="TOP_CENTER">
                  <LiveToast ref="toastSuccess" skin="success" />
                  <LiveToast ref="toastError" skin="danger" />
                </ToastContainer>
              </Teleport>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { useField } from "vee-validate";
import { TOP_CENTER } from "@/constants/toasts";
import { PATIENTS_ICON } from "@/constants/icons";
import { useCustomersStore } from "@/stores/app/customers/customers";
import { onMounted, onUnmounted, Ref, ref } from "vue";
import moment from "moment";
import type { NewCustomerDto } from "@/stores/app/customers/dto";
import startCase from "lodash/startCase";
import { Modal } from "bootstrap";

const addNewCustomerModalRef: Ref<HTMLDivElement | null> = ref(null);

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
      delay: 1000,
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
      delay: 3000,
    });

    toastError.value?.show();
  }
};

const onAddClick = async () => {
  if (validateForm()) await addCustomer(createCustomerPayload());
  addNewCustomerModal.value?.hide();
  emit("on-added-customer");
};

const addNewCustomerModal: Ref<Modal | null> = ref(null);

defineExpose({
  showModal: () => addNewCustomerModal.value?.show(),
  hideModal: () => addNewCustomerModal.value?.hide(),
});

const onCancelClick = () => {
  addNewCustomerModal.value?.hide();
};

const emit = defineEmits(["on-hidden-bs-modal", "on-added-customer"]);

onMounted(() => {
  if (addNewCustomerModalRef.value)
    addNewCustomerModal.value = new Modal(addNewCustomerModalRef.value);

  emit("on-hidden-bs-modal");
});

onUnmounted(() => {
  addNewCustomerModalRef.value?.removeEventListener(
    "shown.bs.modal",
    function () {}
  );
});
</script>

<style scoped></style>
