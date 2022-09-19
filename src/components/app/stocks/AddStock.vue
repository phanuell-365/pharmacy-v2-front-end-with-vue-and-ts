<template>
  <hr class="my-3">
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>

    <!--  issueUnitPrice  -->
    <InputContainer :invalid-feedback="issueUnitPriceErrorMessage" input-id="issueUnitPrice"
                    input-label="issueUnitPrice">
      <input
        id="validationIssueUnitPrice"
        v-model.trim="issueUnitPrice"
        :class="{'is-invalid': !issueUnitPriceMeta.valid && issueUnitPriceMeta.validated}"
        class="form-control"
        name="issueUnitPrice"
        required
        type="text"
      />
    </InputContainer>

    <!--  issueUnitPerPackSize  -->

    <InputContainer :invalid-feedback="issueUnitPerPackSizeErrorMessage" input-id="issueUnitPerPackSize"
                    input-label="issueUnitPerPackSize">
      <input
        id="validationIssueUnitPerPackSize"
        v-model.trim="issueUnitPerPackSize"
        :class="{'is-invalid': !issueUnitPerPackSizeMeta.valid && issueUnitPerPackSizeMeta.validated}"
        class="form-control"
        name="issueUnitPerPackSize"
        required
        type="text"
      />
    </InputContainer>

    <!--  packSize  -->

    <InputContainer :invalid-feedback="packSizeErrorMessage" input-id="packSize" input-label="packSize">
      <input
        id="validationPackSize"
        v-model.trim="packSize"
        :class="{'is-invalid': !packSizeMeta.valid && packSizeMeta.validated}"
        class="form-control"
        name="packSize"
        required
        type="text"
      />
    </InputContainer>

    <!--  packSizePrice  -->

    <InputContainer :invalid-feedback="packSizePriceErrorMessage" input-id="packSizePrice" input-label="packSizePrice">
      <input
        id="validationPackSizePrice"
        v-model.trim="packSizePrice"
        :class="{'is-invalid': !packSizePriceMeta.valid && packSizePriceMeta.validated}"
        class="form-control"
        name="packSizePrice"
        required
        type="text"
      />
    </InputContainer>

    <!--  expirationDate  -->
    <InputContainer :invalid-feedback="expirationDateErrorMessage" input-id="expirationDate"
                    input-label="expirationDate">
      <input
        id="validationExpirationDate"
        v-model.trim="expirationDate"
        :class="{'is-invalid': !expirationDateMeta.valid && expirationDateMeta.validated}"
        class="form-control"
        name="expirationDate"
        required
        type="date"
      />
    </InputContainer>

    <!--  MedicineId  -->

    <InputContainer :invalid-feedback="MedicineIdErrorMessage" input-id="MedicineId" input-label="MedicineId">
      <select
        id="validationMedicineId"
        v-model.trim="MedicineId"
        :class="{'is-invalid': !MedicineIdMeta.valid && MedicineIdMeta.validated}"
        class="form-select"
        name="MedicineId"
        required
      >
        <option v-for="medicine in medicines" :key="medicine.name" :value="medicine.id">
          {{ startCase(medicine.name) }}
        </option>
      </select>
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
import { TOP_CENTER } from "@/constants/toasts";
import { useField } from "vee-validate";
import { useIsNumeric } from "@/composables/is-numeric";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import { ref } from "vue";
import startCase from "lodash/startCase";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import moment from "moment";
import type { NewStockDto } from "@/stores/app/stock/dto";
import { useStocksStore } from "@/stores/app/stock/stocks";

const router = useRouter();

const medicinesStore = useMedicinesStore();
const stocksStore = useStocksStore();

const medicines: Ref<MedicineDto[]> = ref([]);

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

try {
  medicines.value = await medicinesStore.fetchMedicines();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Medicine Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Medicines Error",
    text: "Failed to fetch medicines from the server",
    delay: 5000
  });

  toastError.value?.show();
}

const issueUnitPriceValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  if (!useIsNumeric(value).value) {
    return "The issue unit price should be a number";
  }

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

const packSizeValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const packSizePriceValidation = (value: string) => {
  if (!value)
    return "This is a required field";

  if (!useIsNumeric(value).value)
    return "The pack size price should be a number";

  return true;
};

const expirationDateValidation = (value: string) => {
  if (!value)
    return "This is a required field";

  if (new Date(value) < new Date())
    return "Enter a valid date.";

  return true;
};


const {
  value: issueUnitPrice,
  errorMessage: issueUnitPriceErrorMessage,
  meta: issueUnitPriceMeta
} = useField("issueUnitPrice", issueUnitPriceValidation);

const {
  value: issueUnitPerPackSize,
  errorMessage: issueUnitPerPackSizeErrorMessage,
  meta: issueUnitPerPackSizeMeta
} = useField("issueUnitPerPackSize", issueUnitPerPackSizeValidation);

const {
  value: packSize,
  errorMessage: packSizeErrorMessage,
  meta: packSizeMeta
} = useField("packSize", packSizeValidation);


const {
  value: packSizePrice,
  errorMessage: packSizePriceErrorMessage,
  meta: packSizePriceMeta
} = useField("packSizePrice", packSizePriceValidation);

const {
  value: expirationDate,
  errorMessage: expirationDateErrorMessage,
  meta: expirationDateMeta
} = useField("expirationDate", expirationDateValidation);

const {
  value: MedicineId,
  errorMessage: MedicineIdErrorMessage,
  meta: MedicineIdMeta
} = useField("MedicineId");

const validateForm = () => {
  if (issueUnitPerPackSizeMeta.valid && issueUnitPriceMeta.valid && packSizeMeta.valid && packSizePriceMeta.valid && expirationDateMeta.valid && MedicineIdMeta.valid)
    return true;
  else {
    toastError.value?.setupToast({
      name: "Add Stock Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Stock Error",
      text: "Please fill in the required fields",
      delay: 5000
    });

    toastError.value?.show();
  }
};

const createStockPayload = () => {
  const payload: NewStockDto = {
    issueUnitPrice: +issueUnitPrice.value,
    issueUnitPerPackSize: +issueUnitPerPackSize.value,
    packSize: startCase(packSize.value),
    packSizePrice: +packSizePrice.value,
    expirationDate: new Date(expirationDate.value),
    MedicineId: MedicineId.value as string
  };

  return payload;
};

const addStock = async (payload: NewStockDto) => {
  try {
    const stock = await stocksStore.addStock(payload);

    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Stock",
      text: "Added the stock successfully!",
      delay: 3000
    });

    toastSuccess.value?.show();

    return stock;
  } catch (error: any) {

    console.error(error);

    toastError.value?.setupToast({
      name: "Add Stock Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Stock Error",
      text: "Failed to add the stock",
      delay: 5000
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onAddClick = async () => {

  if (validateForm())
    await addStock(createStockPayload());
};

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addStock(createStockPayload());

    // select the form using the formRef
    const form = formRef.value as HTMLFormElement;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const stock = await addStock(createStockPayload());

    routeRedirect.value = `/stocks/${stock?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addStock(createStockPayload());

    routeRedirect.value = "/stocks";
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
