<template>
  <hr class="my-3" />

  <form
    ref="formRef"
    autocomplete="off"
    class="row g-3 m-4"
    novalidate
    @submit.prevent
  >
    <div class="col-lg-4 col-md-4">
      <SearchPanel
        ref="medicineSearchPanelRef"
        :filter-array="medicineSearchPairs"
        label="medicine"
        name="medicine"
        @on-found-item="onFoundMedicineItem"
      />
    </div>

    <div class="col-lg-4 col-md-4">
      <SearchPanel
        ref="suppliersSearchPaneRef"
        :filter-array="suppliersSearchPairs"
        label="suppliers"
        name="suppliers"
        @on-found-item="onFoundSupplierItem"
      />
    </div>
    <!-- MedicineId-->
    <!--    <InputContainer-->
    <!--      :invalid-feedback="MedicineIdErrorMessage"-->
    <!--      input-id="MedicineId"-->
    <!--      input-label="MedicineId"-->
    <!--    >-->
    <!--      <select-->
    <!--        id="validationMedicineId"-->
    <!--        v-model="MedicineId"-->
    <!--        :class="{-->
    <!--          'is-invalid': !MedicineIdMeta.valid && MedicineIdMeta.validated,-->
    <!--        }"-->
    <!--        class="form-select"-->
    <!--        name="MedicineId"-->
    <!--        required-->
    <!--      >-->
    <!--        <option-->
    <!--          v-for="medicine in medicines"-->
    <!--          :key="medicine.name"-->
    <!--          :value="medicine.id"-->
    <!--        >-->
    <!--          {{ startCase(medicine.name) }}-->
    <!--        </option>-->
    <!--      </select>-->
    <!--    </InputContainer>-->
    <!--  SupplierId  -->
    <!--    <InputContainer-->
    <!--      :invalid-feedback="SupplierIdErrorMessage"-->
    <!--      input-id="SupplierId"-->
    <!--      input-label="SupplierId"-->
    <!--    >-->
    <!--      <select-->
    <!--        id="validationSupplierId"-->
    <!--        v-model.trim="SupplierId"-->
    <!--        :class="{-->
    <!--          'is-invalid': !SupplierIdMeta.valid && SupplierIdMeta.validated,-->
    <!--        }"-->
    <!--        class="form-select"-->
    <!--        name="SupplierId"-->
    <!--        required-->
    <!--      >-->
    <!--        <option-->
    <!--          v-for="supplier in suppliers"-->
    <!--          :key="supplier.name"-->
    <!--          :value="supplier.id"-->
    <!--        >-->
    <!--          {{ startCase(supplier.name) }}-->
    <!--        </option>-->
    <!--      </select>-->
    <!--    </InputContainer>-->
    <!--  orderQuantity  -->
    <!--    <InputContainer-->
    <!--      :invalid-feedback="orderQuantityErrorMessage"-->
    <!--      class="w-25"-->
    <!--      input-id="orderQuantity"-->
    <!--      input-label="orderQuantity"-->
    <!--    >-->

    <div class="col-md-4">
      <div class="col-md-10 pt-2">
        <label
          :for="`validation${startCase('orderQuantity')}`"
          class="form-label fw-bold"
        >
          {{ startCase("orderQuantity") }}:
        </label>
        <input
          id="validationOrderQuantity"
          v-model.trim="orderQuantity"
          :class="{
            'is-invalid':
              !orderQuantityMeta.valid && orderQuantityMeta.validated,
          }"
          class="form-control"
          name="orderQuantity"
          required
          type="text"
        />
        <div class="invalid-feedback">{{ orderQuantityErrorMessage }}</div>
      </div>
    </div>
    <!--    </InputContainer>-->

    <!--  status  -->
    <InputContainer
      :invalid-feedback="statusErrorMessage"
      input-id="status"
      input-label="status"
    >
      <select
        id="validationStatus"
        v-model.trim="status"
        :class="{ 'is-invalid': !statusMeta.valid && statusMeta.validated }"
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

    <hr class="my-3" />
    <FormButtonsContainer>
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
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import SearchPanel from "@/components/search/SearchPanel.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useRouter } from "vue-router";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import startCase from "lodash/startCase";
import moment from "moment";
import { useField } from "vee-validate";
import { useIsNumeric } from "@/composables/is-numeric";
import type { NewOrderDto } from "@/stores/app/orders/dto";
import { useOrdersStore } from "@/stores/app/orders/orders";

interface AddOrderProps {
  medicineId?: string;
}

const props = defineProps<AddOrderProps>();

const router = useRouter();

const medicinesStore = useMedicinesStore();
const suppliersStore = useSuppliersStore();
const ordersStore = useOrdersStore();

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

const medicines: Ref<MedicineDto[]> = ref([]);
const suppliers: Ref<SupplierDto[]> = ref([]);
const orderStatuses: Ref<string[]> = ref([]);

interface SearchPairs {
  name: string;
  id: string;
}

const medicineSearchPairs: Ref<SearchPairs[]> = ref([]);
const suppliersSearchPairs: Ref<SearchPairs[]> = ref([]);
const medicineSearchPanelRef: Ref<InstanceType<SearchPanel>> = ref();
const suppliersSearchPaneRef: Ref<InstanceType<SearchPanel>> = ref();

try {
  medicines.value = await medicinesStore.fetchMedicines();
  suppliers.value = await suppliersStore.fetchSuppliers();
  orderStatuses.value = await ordersStore.fetchOrderStatus();
} catch (error: any) {
  console.log(error);
  if (error?.statusCode) {
    if (error?.statusCode === 403)
      router.push({
        name: "un-authorized",
        path: "/un-authorized",
        params: { action: "place-an-order" },
      });
  }
  if (error?.message?.includes("medicine"))
    toastError.value?.setupToast({
      name: "Medicines Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Medicines Error",
      text: "Failed to medicines roles from the server. " + error?.message,
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

medicineSearchPairs.value = medicines.value.map((value) => ({
  id: value.id,
  name: value.name,
}));
suppliersSearchPairs.value = suppliers.value.map((value) => ({
  id: value.id,
  name: value.name,
}));

//set the default value for the search panel

onMounted(async () => {
  if (props.medicineId) {
    const medicine = await medicinesStore.fetchMedicineById(props.medicineId);

    MedicineId.value = medicine.name;
    medicineSearchPanelRef.value?.defaultText(medicine.name);
  }
});

const onFoundMedicineItem = (item: SearchPairs, name: string) => {
  // console.log("this is the found item -> ", item);
  if (item?.id && name === "click") MedicineId.value = item.id;
};

const onFoundSupplierItem = (item: SearchPairs, name: string) => {
  // console.log("this is the found item -> ", item);
  if (item?.id && name === "click") SupplierId.value = item.id;
};

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

const validateForm = () => {
  if (MedicineIdMeta.valid && SupplierIdMeta.valid && orderQuantityMeta.valid)
    return true;
  else {
    toastError.value?.setupToast({
      name: "Place Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Place Order Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createOrderPayload = () => {
  const payload: NewOrderDto = {
    orderQuantity: +orderQuantity.value,
    status: status.value,
    MedicineId: MedicineId.value,
    SupplierId: SupplierId.value,
  };

  return payload;
};

const addOrder = async (payload: NewOrderDto) => {
  try {
    const order = await ordersStore.addOrder(payload);

    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Place Order",
      text: "Placed the order successfully!",
      delay: 3000,
    });

    toastSuccess.value?.show();

    return order;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Place Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Place Order Error",
      text: "Failed to place the order. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

// const onAddClick = async () => {
//   if (validateForm()) await addOrder(createOrderPayload());
// };

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addOrder(createOrderPayload());

    // select the form using the formRef
    const form = formRef.value as HTMLFormElement;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const order = await addOrder(createOrderPayload());

    routeRedirect.value = `/orders/${order?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addOrder(createOrderPayload());

    routeRedirect.value = "/orders";
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
