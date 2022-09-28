<template>
  <hr class="my-3" />

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
        :disabled="!setUpdateMode && setViewMode"
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
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="phone"
        required
        type="tel"
      />
    </InputContainer>

    <hr class="my-3" />

    <FormButtonsContainer>
      <FormButton skin="primary" text="update" @click="onUpdateClick" />
      <FormButton skin="secondary" text="add new" @click="onAddNewClick" />
      <FormButton
        v-if="setUpdateMode && !setViewMode"
        outline
        skin="secondary"
        text="view"
        @click="onViewClick"
      />
      <FormButton
        outline
        skin="secondary"
        text="view all"
        @click="onViewAllClick"
      />
      <FormButton outline skin="danger" text="delete" @click="onDeleteClick" />
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

      <DeleteModal ref="deleteModalRef" name="delete-supplier">
        <template #buttons>
          <button
            class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
            data-bs-dismiss="modal"
            type="button"
            @click="onDeleteSupplier"
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
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import type {
  SupplierDto,
  UpdateSupplierDto,
} from "@/stores/app/suppliers/dto";
import { useRouter } from "vue-router";
import moment from "moment";
import { useField } from "vee-validate";
import startCase from "lodash/startCase";

interface ManageSupplierProps {
  supplierId: string;
  updateMode?: boolean;
}

const router = useRouter();

const suppliersStore = useSuppliersStore();

const formRef: Ref<HTMLFormElement | undefined> = ref();
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const supplier: Ref<SupplierDto | null> = ref(null);

const props = defineProps<ManageSupplierProps>();

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

try {
  supplier.value = await suppliersStore.fetchSupplierById(props.supplierId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "Supplier not found!") {
    router.push(`/errors/suppliers/${props.supplierId}`);
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

name.value = supplier.value?.name as string;
email.value = supplier.value?.email as string;
phone.value = supplier.value?.phone as string;

const validateForm = () => {
  if (nameMeta.valid && emailMeta.valid && phoneMeta.valid) return true;
  else {
    toastError.value?.setupToast({
      name: "Add Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Supplier Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdateSupplierPayload = () => {
  const payload: UpdateSupplierDto = {
    name: startCase(name.value),
    email: email.value,
    phone: phone.value,
  };

  return payload;
};

const updateSupplier = async (payload: UpdateSupplierDto) => {
  try {
    const supplier = await suppliersStore.updateSupplier(
      props.supplierId,
      payload
    );

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Supplier",
      text: "Updated the supplier successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return supplier;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Supplier Error",
      text: "Failed to update the supplier. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateSupplier(createUpdateSupplierPayload());
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
  await router.push("/suppliers/create");
};

const onViewAllClick = async () => {
  await router.push("/suppliers");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this supplier ?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeleteSupplier = async () => {
  try {
    response.value = await suppliersStore.deleteSupplier(props.supplierId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete Supplier Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Supplier Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Supplier Error",
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
