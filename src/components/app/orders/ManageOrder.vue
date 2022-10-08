<template>
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>
    <!--     MedicineId-->
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
    <!--      SupplierId  -->
    <InputContainer
      :invalid-feedback="SupplierIdErrorMessage"
      input-id="SupplierId"
      input-label="Supplier"
    >
      <select
        id="validationSupplierId"
        v-model.trim="SupplierId"
        :class="{
          'is-invalid': !SupplierIdMeta.valid && SupplierIdMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-select"
        name="SupplierId"
        required
      >
        <option
          v-for="supplier in suppliers"
          :key="supplier.name"
          :value="supplier.id"
        >
          {{ startCase(supplier.name) }}
        </option>
      </select>
    </InputContainer>

    <InputContainer
      :invalid-feedback="orderQuantityErrorMessage"
      input-id="orderQuantity"
      input-label="orderQuantity"
    >
      <input
        id="validationOrderQuantity"
        v-model.trim="orderQuantity"
        :class="{
          'is-invalid': !orderQuantityMeta.valid && orderQuantityMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="orderQuantity"
        required
        type="text"
      />
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
        <option
          v-for="_status in orderStatuses"
          :key="_status"
          :value="_status"
        >
          {{ startCase(_status) }}
        </option>
      </select>
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
    <DeleteModal ref="deleteModalRef" name="delete-order">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteOrder"
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
import startCase from "lodash/startCase";
import { TOP_CENTER } from "@/constants/toasts";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { OrderDtoWithId } from "@/stores/app/orders/dto/order.dto";
import { useField } from "vee-validate";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import moment from "moment";
import { useIsNumeric } from "@/composables/is-numeric";
import type { UpdateOrderDto } from "@/stores/app/orders/dto/update-order.dto";

interface ManageOrderProps {
  orderId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageOrderProps>();

const ordersStore = useOrdersStore();
const medicinesStore = useMedicinesStore();
const suppliersStore = useSuppliersStore();

const order: Ref<OrderDtoWithId | null> = ref(null);
const medicine: Ref<MedicineDto | null> = ref(null);
const supplier: Ref<SupplierDto | null> = ref(null);
const medicines: Ref<MedicineDto[]> = ref([]);
const suppliers: Ref<SupplierDto[]> = ref([]);
const orderStatuses: Ref<string[]> = ref([]);

const formRef: Ref<HTMLFormElement | null> = ref(null);
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

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
  order.value = (await ordersStore.fetchOrderById(
    props.orderId,
    true
  )) as OrderDtoWithId;

  if (order.value?.MedicineId)
    medicine.value = await medicinesStore.fetchMedicineById(
      order.value?.MedicineId
    );

  if (order.value?.SupplierId)
    supplier.value = await suppliersStore.fetchSupplierById(
      order.value?.SupplierId
    );

  medicines.value = await medicinesStore.fetchMedicines();
  suppliers.value = await suppliersStore.fetchSuppliers();
  orderStatuses.value = await ordersStore.fetchOrderStatus("update");
} catch (error: any) {
  console.error(error.message);

  if (error.message === "Order not found!") {
    router.push(`/errors/orders/${props.orderId}`);
  }

  if (error?.message?.includes("medicine"))
    toastError.value?.setupToast({
      name: "Medicines Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Medicines Error",
      text:
        "Failed to fetch medicines roles from the server. " + error?.message,
      delay: 5000,
    });

  if (error?.message?.includes("suppliers"))
    toastError.value?.setupToast({
      name: "Suppliers Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Suppliers Error",
      text: "Failed to fetch suppliers from the server. " + error?.message,
      delay: 5000,
    });

  toastError.value?.show();
}

const MedicineIdValidation = (value: string) => {
  if (!value) return "This is a required field";

  return true;
};

const SupplierIdValidation = (value: string) => {
  if (!value) return "This is a required field";

  return true;
};

const orderQuantityValidation = (value: string) => {
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
  value: SupplierId,
  errorMessage: SupplierIdErrorMessage,
  meta: SupplierIdMeta,
} = useField("SupplierId", SupplierIdValidation);

const {
  value: orderQuantity,
  errorMessage: orderQuantityErrorMessage,
  meta: orderQuantityMeta,
} = useField("orderQuantity", orderQuantityValidation);

const {
  value: status,
  errorMessage: statusErrorMessage,
  meta: statusMeta,
} = useField("status", statusValidation);

if (order.value?.orderQuantity)
  orderQuantity.value = order.value?.orderQuantity as unknown as string;
if (order.value?.status) status.value = order.value?.status;
if (order.value?.MedicineId) MedicineId.value = order.value?.MedicineId;
if (order.value?.SupplierId) SupplierId.value = order.value?.SupplierId;

const validateForm = () => {
  if (MedicineIdMeta.valid && SupplierIdMeta.valid && orderQuantityMeta.valid)
    return true;
  else {
    toastError.value?.setupToast({
      name: "Update Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Order Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdateOrderPayload = () => {
  const payload: UpdateOrderDto = {
    orderQuantity: +orderQuantity.value,
    status: status.value,
    MedicineId: MedicineId.value,
    SupplierId: SupplierId.value,
  };

  return payload;
};

const updateOrder = async (payload: UpdateOrderDto) => {
  try {
    const order = await ordersStore.updateOrder(payload, props.orderId);

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Order",
      text: "Updated the order successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return order;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Order Error",
      text: "Failed to update the order. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateOrder(createUpdateOrderPayload());
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
  await router.push("/orders/create");
};

const onViewAllClick = async () => {
  await router.push("/orders");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this order?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeleteOrder = async () => {
  try {
    response.value = await ordersStore.deleteOrder(props.orderId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete Order Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Order Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Order Error",
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
