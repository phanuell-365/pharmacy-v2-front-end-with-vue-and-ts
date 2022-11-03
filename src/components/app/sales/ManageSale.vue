<template>
  <form
    ref="formRef"
    autocomplete="off"
    class="row g-3 m-4"
    novalidate
    @submit.prevent
  >
    <InputContainer
      :invalid-feedback="MedicineIdErrorMessage"
      input-id="MedicineId"
      input-label="Medicine"
    >
      <select
        id="validationMedicineId"
        v-model="MedicineId"
        :class="{
          'is-invalid': !MedicineIdMeta.valid && MedicineIdMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-select"
        name="MedicineId"
        required
      >
        <option
          v-for="medicine in medicines"
          :key="medicine.name"
          :value="medicine.id"
        >
          {{ startCase(medicine.name) }}
        </option>
      </select>
    </InputContainer>

    <InputContainer
      :invalid-feedback="CustomerIdErrorMessage"
      input-id="CustomerId"
      input-label="Customer"
    >
      <select
        id="validationCustomerId"
        v-model="CustomerId"
        :class="{
          'is-invalid': !CustomerIdMeta.valid && CustomerIdMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-select"
        name="CustomerId"
        required
      >
        <option
          v-for="customer in customers"
          :key="customer.name"
          :value="customer.id"
        >
          {{ startCase(customer.name) }}
        </option>
      </select>
    </InputContainer>

    <InputContainer
      :invalid-feedback="statusErrorMessage"
      input-id="status"
      input-label="status"
    >
      <select
        id="validationStatus"
        v-model.trim="status"
        :class="{ 'is-invalid': !statusMeta.valid && statusMeta.validated }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-select"
        name="status"
        required
      >
        <option v-for="_status in saleStatuses" :key="_status" :value="_status">
          {{ startCase(_status) }}
        </option>
      </select>
    </InputContainer>

    <InputContainer input-id="issueUnitPrice" input-label="issueUnitPrice">
      <input
        id="validationProfitPerIssueUnit"
        v-model="issueUnitPrice"
        class="form-control shadow-sm"
        disabled
        name="issueUnitPrice"
        required
        type="number"
      />
    </InputContainer>

    <InputContainer input-id="saleDate" input-label="saleDate">
      <input
        id="validationOrderDate"
        v-model="saleDate"
        class="form-control shadow-sm"
        disabled
        name="saleDate"
        required
        type="text"
      />
    </InputContainer>

    <InputContainer
      :invalid-feedback="issueUnitQuantityErrorMessage"
      input-id="issueUnitQuantity"
      input-label="issueUnitQuantity"
    >
      <input
        id="validationIssueUnitQuantity"
        v-model.trim="issueUnitQuantity"
        :class="{
          'is-invalid':
            !issueUnitQuantityMeta.valid && issueUnitQuantityMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="issueUnitQuantity"
        required
        type="text"
      />
    </InputContainer>

    <InputContainer input-id="totalPrice" input-label="totalPrice">
      <input
        id="validationTotalPackSizePrice"
        v-model="totalPrice"
        class="form-control shadow-sm"
        disabled
        name="totalPrice"
        required
        type="number"
      />
    </InputContainer>

    <FormButtonsContainer>
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
  </form>
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
    <DeleteModal ref="deleteModalRef" name="delete-sale">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteSale"
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
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import type { Ref } from "vue";
import { onUpdated, ref, watch } from "vue";
import type { SalesWithIdsDto, UpdateSaleDto } from "@/stores/app/sales/dto";
import { useRouter } from "vue-router";
import { useSalesStore } from "@/stores/app/sales/sales";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import startCase from "lodash/startCase";
import { useField } from "vee-validate";
import moment from "moment";
import { useIsNumeric } from "@/composables/is-numeric";

interface ManageCustomerProps {
  saleId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageCustomerProps>();

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

const salesStore = useSalesStore();
const medicinesStore = useMedicinesStore();
const customersStore = useCustomersStore();

const sale: Ref<SalesWithIdsDto | undefined> = ref();
// const customer: Ref<CustomerDto | undefined> = ref();
// const medicine: Ref<MedicineDto | undefined> = ref();
const customers: Ref<CustomerDto[]> = ref([]);
const medicines: Ref<MedicineDto[]> = ref([]);
const saleStatuses: Ref<string[]> = ref([]);
const issueUnitPrice: Ref<number> = ref(0);
const totalPrice: Ref<number> = ref(0);
const saleDate: Ref<string> = ref("");

const formRef: Ref<HTMLFormElement | null> = ref(null);
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

try {
  sale.value = (await salesStore.fetchSaleById(
    props.saleId,
    true
  )) as SalesWithIdsDto;
  // if (sale.value?.CustomerId)
  //   customer.value = await customersStore.fetchCustomerById(
  //     sale.value?.CustomerId
  //   );
  // if (sale.value?.MedicineId)
  //   medicine.value = await medicinesStore.fetchMedicineById(
  //     sale.value?.MedicineId
  //   );

  saleStatuses.value = await salesStore.fetchSalesStatus();

  customers.value = await customersStore.fetchCustomers();
  medicines.value = await medicinesStore.fetchMedicines(false);
} catch (error: any) {
  console.error(error.message);

  if (error.message === "Customer not found!") {
    router.push(`/errors/customers/${sale.value?.CustomerId}`);
  }
  if (error.message === "Medicine not found!") {
    router.push(`/errors/medicines/${sale.value?.MedicineId}`);
  }
}

onUpdated(() => {
  if (issueUnitQuantityMeta.valid)
    totalPrice.value = issueUnitPrice.value * +issueUnitQuantity.value;
});

const MedicineIdValidation = (value: string) => {
  if (!value) return "This is a required field";
  //
  // if (
  //   !medicines.value.some((value1) =>
  //     value1.toLowerCase().includes(value.toLowerCase())
  //   )
  // )
  //   return "The medicine should be one of the ones on the table";

  return true;
};

const CustomerIdValidation = (value: string) => {
  if (!value) return "This is a required field";
  //
  // if (
  //   !medicines.value.some((value1) =>
  //     value1.toLowerCase().includes(value.toLowerCase())
  //   )
  // )
  //   return "The medicine should be one of the ones on the table";

  return true;
};

const issueUnitQuantityValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (!useIsNumeric(value)) return "The order quantity should be a number";

  return true;
};

const statusValidation = (value: string) => {
  if (!value) return "This is a required field";

  return true;
};

const {
  value: MedicineId,
  errorMessage: MedicineIdErrorMessage,
  meta: MedicineIdMeta,
} = useField("MedicineId", MedicineIdValidation);

const {
  value: CustomerId,
  errorMessage: CustomerIdErrorMessage,
  meta: CustomerIdMeta,
} = useField("CustomerId", CustomerIdValidation);

const {
  value: issueUnitQuantity,
  errorMessage: issueUnitQuantityErrorMessage,
  meta: issueUnitQuantityMeta,
} = useField("issueUnitQuantity", issueUnitQuantityValidation);

const {
  value: status,
  errorMessage: statusErrorMessage,
  meta: statusMeta,
} = useField("status", statusValidation);

if (sale.value?.MedicineId) MedicineId.value = sale.value?.MedicineId;
if (sale.value?.CustomerId) CustomerId.value = sale.value?.CustomerId;
if (sale.value?.status) status.value = sale.value?.status;
if (sale.value?.issueUnitQuantity)
  issueUnitQuantity.value = sale.value?.issueUnitQuantity.toString();
if (sale.value?.issueUnitPrice)
  issueUnitPrice.value = +sale.value?.issueUnitPrice;
if (sale.value?.totalPrice) totalPrice.value = +sale.value?.totalPrice;
if (sale.value?.saleDate)
  saleDate.value = new Date(sale.value?.saleDate).toLocaleDateString();

const validateForm = () => {
  if (
    MedicineIdMeta.valid &&
    CustomerIdMeta.valid &&
    issueUnitQuantityMeta.valid
  )
    return true;
  else {
    toastError.value?.setupToast({
      name: "Update Sale Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Sale Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdateSalePayload = () => {
  // reevaluate the amount received

  let newAmountReceived = 0;
  if (sale.value?.amountReceived && sale.value?.totalPrice) {
    const currentAmountReceived = sale.value?.amountReceived;

    const revertedAmountReceived =
      +currentAmountReceived - +sale.value?.totalPrice;

    newAmountReceived = revertedAmountReceived + totalPrice.value;
  }
  const payload: UpdateSaleDto = {
    MedicineId: MedicineId.value,
    CustomerId: CustomerId.value,
    issueUnitQuantity: +issueUnitQuantity.value,
    status: status.value,
    amountReceived: newAmountReceived,
  };

  return payload;
};

const updateSale = async (payload: UpdateSaleDto) => {
  try {
    const sale = await salesStore.updateSale(props.saleId, payload);

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Sale",
      text: "Updated the sale successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return sale;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Sale Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Sale Error",
      text: "Failed to update the sale. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateSale(createUpdateSalePayload());
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
  await router.push("/sales/create");
};

const onViewAllClick = async () => {
  await router.push("/sales");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this sale?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeleteSale = async () => {
  try {
    response.value = await salesStore.deleteSale(props.saleId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete Sale Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Sale Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    await router.push("/sales");
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Sale Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Sale Error",
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
