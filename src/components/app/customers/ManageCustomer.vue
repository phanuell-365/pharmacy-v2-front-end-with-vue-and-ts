<template>
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>
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
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="name"
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
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="email"
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
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="phone"
        type="tel"
      />
    </InputContainer>

    <FormButtonsContainer class="mt-5">
      <FormButton skin="primary" text="Update" @click="onUpdateClick" />
      <FormButton skin="secondary" text="Add New" @click="onAddNewClick" />
      <FormButton
        v-if="setUpdateMode && !setViewMode"
        outline
        skin="secondary"
        text="View"
        @click="onViewClick"
      />
      <FormButton
        outline
        skin="secondary"
        text="View All"
        @click="onViewAllClick"
      />
      <FormButton outline skin="danger" text="Delete" @click="onDeleteClick" />
    </FormButtonsContainer>

    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast
          ref="toastUpdate"
          skin="info"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>

      <DeleteModal ref="deleteModalRef" name="delete-customer">
        <template #buttons>
          <button
            class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
            data-bs-dismiss="modal"
            type="button"
            @click="onDeleteCustomer"
          >
            <strong>Yes</strong>
          </button>
          <button
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
            data-bs-dismiss="modal"
            type="button"
          >
            Cancel
          </button>
        </template>
      </DeleteModal>
    </Teleport>
  </form>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { ref } from "vue";
import type {
  CustomerDto,
  UpdateCustomerDto,
} from "@/stores/app/customers/dto";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import moment from "moment";
import startCase from "lodash/startCase";

interface ManageCustomerProps {
  customerId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageCustomerProps>();

const customersStore = useCustomersStore();

const formRef: Ref<HTMLFormElement | undefined> = ref();
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const customer: Ref<CustomerDto | null> = ref(null);

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

try {
  customer.value = await customersStore.fetchCustomerById(props.customerId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "Customer not found!") {
    router.push(`/errors/customers/${props.customerId}`);
  }
}

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

name.value = customer.value?.name as string;
email.value = customer.value?.email as string;
phone.value = customer.value?.phone as string;

const validateForm = () => {
  if (nameMeta.valid && emailMeta.valid && phoneMeta.valid) return true;
  else {
    toastError.value?.setupToast({
      name: "Update Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Customer Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdateCustomerPayload = () => {
  const payload: UpdateCustomerDto = {
    name: startCase(name.value),
    email: email.value,
    phone: phone.value,
  };

  return payload;
};

const updateCustomer = async (payload: UpdateCustomerDto) => {
  try {
    const customer = await customersStore.updateCustomer(
      props.customerId,
      payload
    );

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Customer",
      text: "Updated the customer successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return customer;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Customer Error",
      text: "Failed to update the customer. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateCustomer(createUpdateCustomerPayload());
  } else {
    setUpdateMode.value = true;
    setViewMode.value = false;
  }
};

const onViewClick = () => {
  setUpdateMode.value = false;
  setViewMode.value = true;
};

const onAddNewClick = async () => {
  await router.push("/customers/create");
};

const onViewAllClick = async () => {
  await router.push("/customers");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this customer ?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeleteCustomer = async () => {
  try {
    response.value = await customersStore.deleteCustomer(props.customerId);

    toastWarning.value?.setupToast({
      name: "Delete Customer Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Customer Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Customer Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onHiddenBsToast = () => {
  router.push(routeRedirect.value);
};
</script>

<style scoped></style>
