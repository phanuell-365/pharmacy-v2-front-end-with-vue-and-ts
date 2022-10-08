<template>
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>
    <!--    <InputContainer-->
    <!--      :invalid-feedback="MedicineIdErrorMessage"-->
    <!--      input-id="MedicineId"-->
    <!--      input-label="Medicine"-->
    <!--    >-->
    <!--      <input-->
    <!--        id="validationMedicineId"-->
    <!--        v-model="Medicine"-->
    <!--        :class="{-->
    <!--          'is-invalid': !MedicineIdMeta.valid && MedicineIdMeta.validated,-->
    <!--        }"-->
    <!--        :placeholder="MedicinePlaceholder"-->
    <!--        class="form-control"-->
    <!--        name="name"-->
    <!--        required-->
    <!--        type="text"-->
    <!--      />-->
    <!--    </InputContainer>-->

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
    <!--      Supplier      -->

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

    <!--    <InputContainer-->
    <!--      :invalid-feedback="SupplierIdErrorMessage"-->
    <!--      input-id="SupplierId"-->
    <!--      input-label="Supplier"-->
    <!--    >-->
    <!--      <input-->
    <!--        id="validationMedicineId"-->
    <!--        v-model="Supplier"-->
    <!--        :class="{-->
    <!--          'is-invalid': !SupplierIdMeta.valid && SupplierIdMeta.validated,-->
    <!--        }"-->
    <!--        :placeholder="SupplierPlaceholder"-->
    <!--        class="form-control"-->
    <!--        name="name"-->
    <!--        required-->
    <!--        type="text"-->
    <!--      />-->
    <!--    </InputContainer>-->

    <!--    &lt;!&ndash;    orderQuantity        &ndash;&gt;-->
    <!--    <InputContainer input-id="orderQuantity" input-label="orderQuantity">-->
    <!--      <input-->
    <!--        id="validationOrderQuantity"-->
    <!--        :value="orderQuantity"-->
    <!--        class="form-control shadow-sm"-->
    <!--        disabled-->
    <!--        readonly-->
    <!--        type="text"-->
    <!--      />-->
    <!--    </InputContainer>-->

    <!--    packSizeQuantity        -->
    <InputContainer
      :invalid-feedback="packSizeQuantityErrorMessage"
      input-id="packSizeQuantity"
      input-label="packSizeQuantity"
    >
      <input
        id="validationPackSizeQuantity"
        v-model="packSizeQuantity"
        :class="{
          'is-invalid':
            !packSizeQuantityMeta.valid && packSizeQuantityMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="packSizeQuantity"
        required
        type="text"
      />
    </InputContainer>

    <!--      pricePerPackSize      -->
    <InputContainer
      :invalid-feedback="pricePerPackSizeErrorMessage"
      input-id="pricePerPackSize"
      input-label="pricePerPackSize"
    >
      <input
        id="validationPricePerPackSize"
        v-model.trim="pricePerPackSize"
        :class="{
          'is-invalid':
            !pricePerPackSizeMeta.valid && pricePerPackSizeMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="pricePerPackSize"
        required
        type="text"
      />
    </InputContainer>

    <!--      totalPackSizePrice      -->
    <InputContainer
      input-id="totalPackSizePrice"
      input-label="totalPackSizePrice"
    >
      <input
        id="validationTotalPackSizePrice"
        v-model="totalPackSizePrice"
        class="form-control shadow-sm"
        disabled
        name="totalPackSizePrice"
        required
        type="number"
      />
    </InputContainer>

    <InputContainer
      :invalid-feedback="expiryDateErrorMessage"
      input-id="expiryDate"
      input-label="expiryDate"
    >
      <input
        id="validationExpirationDate"
        v-model.trim="expiryDate"
        :class="{
          'is-invalid': !expiryDateMeta.valid && expiryDateMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="expiryDate"
        placeholder="mm/dd/yyyy"
        required
        type="text"
      />
    </InputContainer>

    <InputContainer
      :invalid-feedback="issueUnitPerPackSizeErrorMessage"
      input-id="issueUnitPerPackSize"
      input-label="issueUnitPerPackSize"
    >
      <input
        id="validationIssueUnitPerPackSize"
        v-model.trim="issueUnitPerPackSize"
        :class="{
          'is-invalid':
            !issueUnitPerPackSizeMeta.valid &&
            issueUnitPerPackSizeMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="issueUnitPerPackSize"
        required
        type="text"
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
    <DeleteModal ref="deleteModalRef" name="delete-purchase">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeletePurchase"
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
import { useRouter } from "vue-router";
import startCase from "lodash/startCase";
import type {
  PurchaseDto,
  UpdatePurchaseDto,
} from "@/stores/app/purchases/dto";
import { usePurchasesStore } from "@/stores/app/purchases/purchases";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { OrderDtoWithId } from "@/stores/app/orders/dto/order.dto";
import { useOrdersStore } from "@/stores/app/orders/orders";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import moment from "moment";

interface ManagePurchaseProps {
  purchaseId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManagePurchaseProps>();

const purchasesStore = usePurchasesStore();
const ordersStore = useOrdersStore();
const suppliersStore = useSuppliersStore();
const medicinesStore = useMedicinesStore();

const formRef: Ref<HTMLFormElement | null> = ref(null);
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

const purchase: Ref<PurchaseDto | null> = ref(null);
const suppliers: Ref<SupplierDto[] | null> = ref(null);
const supplier: Ref<SupplierDto | null> = ref(null);
const medicines: Ref<MedicineDto[] | null> = ref(null);
const medicine: Ref<MedicineDto | null> = ref(null);
const order: Ref<OrderDtoWithId | null> = ref(null);

const totalPackSizePrice: Ref<number> = ref(0);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

try {
  purchase.value = await purchasesStore.fetchPurchaseById(props.purchaseId);

  if (purchase.value?.OrderId)
    order.value = (await ordersStore.fetchOrderById(
      purchase.value?.OrderId,
      true
    )) as OrderDtoWithId;

  suppliers.value = await suppliersStore.fetchSuppliers();

  if (order.value?.SupplierId)
    supplier.value = await suppliersStore.fetchSupplierById(
      order.value?.SupplierId
    );

  medicines.value = await medicinesStore.fetchMedicines();

  if (order.value?.MedicineId)
    medicine.value = await medicinesStore.fetchMedicineById(
      order.value?.MedicineId
    );
} catch (error: any) {
  console.error(error.message);

  if (error.message === "Purchase not found!") {
    router.push(`/errors/purchases/${props.purchaseId}`);
  }
}

onUpdated(() => {
  // orderQuantity.value = orders.value[0].orderQuantity;
  if (packSizeQuantityMeta.valid && pricePerPackSizeMeta.valid) {
    totalPackSizePrice.value =
      +packSizeQuantity.value * +pricePerPackSize.value;
  }
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

const SupplierIdValidation = (value: string) => {
  if (!value) return "This is a required field";

  // if (
  //   !suppliers.value.some((value1) =>
  //     value1.toLowerCase().includes(value.toLowerCase())
  //   )
  // )
  //   return "The supplier should be one of the ones on the table";

  return true;
};

const packSizeQuantityValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  if (!useIsNumeric(value).value)
    return "The pack size quantity should be a number";

  if (+value <= 0) {
    return "The pack size quantity should not be less than or equal to 0";
  }

  return true;
};

const pricePerPackSizeValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  if (!useIsNumeric(value).value)
    return "The price per pack size should be a number";

  if (+value <= 0) {
    return "The pack size quantity should not be less than or equal to 0";
  }

  return true;
};

const expiryDateValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (
    new Date(value) !== new Date(expiryDate.value) &&
    new Date(value) < new Date()
  )
    return "Enter a valid date. The medicine has expired.";

  return true;
};

const issueUnitPerPackSizeValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  if (!useIsNumeric(value).value) {
    return "The issue unit per pack size should be a number";
  }

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
  value: packSizeQuantity,
  errorMessage: packSizeQuantityErrorMessage,
  meta: packSizeQuantityMeta,
} = useField("packSizeQuantity", packSizeQuantityValidation);

const {
  value: pricePerPackSize,
  errorMessage: pricePerPackSizeErrorMessage,
  meta: pricePerPackSizeMeta,
} = useField("pricePerPackSize", pricePerPackSizeValidation);

const {
  value: expiryDate,
  errorMessage: expiryDateErrorMessage,
  meta: expiryDateMeta,
} = useField("expiryDate", expiryDateValidation);

const {
  value: issueUnitPerPackSize,
  errorMessage: issueUnitPerPackSizeErrorMessage,
  meta: issueUnitPerPackSizeMeta,
} = useField("issueUnitPerPackSize", issueUnitPerPackSizeValidation);

if (purchase.value?.purchasedPackSizeQuantity)
  packSizeQuantity.value = purchase.value
    ?.purchasedPackSizeQuantity as unknown as string;

if (purchase.value?.pricePerPackSize)
  pricePerPackSize.value = purchase.value?.pricePerPackSize;

if (purchase.value?.issueUnitPerPackSize)
  issueUnitPerPackSize.value = purchase.value
    ?.issueUnitPerPackSize as unknown as string;

if (purchase.value?.expiryDate)
  expiryDate.value = new Date(purchase.value?.expiryDate).toLocaleDateString();

if (purchase.value?.totalPurchasePrice)
  totalPackSizePrice.value = purchase.value?.totalPurchasePrice as number;
if (order.value?.SupplierId) SupplierId.value = order.value?.SupplierId;
if (order.value?.MedicineId) MedicineId.value = order.value?.MedicineId;

const validateForm = () => {
  if (
    MedicineIdMeta.valid &&
    SupplierIdMeta.valid &&
    pricePerPackSizeMeta.valid &&
    packSizeQuantityMeta.valid
  )
    return true;
  else {
    toastError.value?.setupToast({
      name: "Update Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Purchase Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdatePurchasePayload = () => {
  const payload: UpdatePurchaseDto = {
    purchasedPackSizeQuantity: +packSizeQuantity.value,
    pricePerPackSize: +pricePerPackSize.value,
    OrderId: purchase.value?.OrderId as string,
    issueUnitPerPackSize: +issueUnitPerPackSize.value,
    expiryDate: new Date(expiryDate.value),
  };

  return payload;
};

const updatePurchase = async (payload: UpdatePurchaseDto) => {
  try {
    const purchase = await purchasesStore.updatePurchase(
      props.purchaseId,
      payload
    );

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Purchase",
      text: "Updated the purchase successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return purchase;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Purchase Error",
      text: "Failed to update the purchase. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updatePurchase(createUpdatePurchasePayload());
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
  await router.push("/purchases/create");
};

const onViewAllClick = async () => {
  await router.push("/purchases");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this purchase?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeletePurchase = async () => {
  try {
    response.value = await purchasesStore.deletePurchase(props.purchaseId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete Purchase Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Purchase Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Purchase Error",
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
