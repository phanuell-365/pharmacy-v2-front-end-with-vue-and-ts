<template>
  <section class="add-purchase">
    <form ref="formRef" novalidate @submit.prevent>
      <div class="row">
        <div class="col-md-12 col-sm-6">
          <div class="row g-3 m-2">
            <!--     Medicine       -->
            <InputContainer
              :invalid-feedback="MedicineIdErrorMessage"
              input-id="MedicineId"
              input-label="Medicine"
            >
              <input
                id="validationMedicineId"
                v-model="Medicine"
                :class="{
                  'is-invalid':
                    !MedicineIdMeta.valid && MedicineIdMeta.validated,
                }"
                :placeholder="MedicinePlaceholder"
                class="form-control"
                name="name"
                required
                type="text"
              />
            </InputContainer>
            <!--      Supplier      -->

            <InputContainer
              :invalid-feedback="SupplierIdErrorMessage"
              input-id="SupplierId"
              input-label="Supplier"
            >
              <input
                id="validationMedicineId"
                v-model="Supplier"
                :class="{
                  'is-invalid':
                    !SupplierIdMeta.valid && SupplierIdMeta.validated,
                }"
                :placeholder="SupplierPlaceholder"
                class="form-control"
                name="name"
                required
                type="text"
              />
            </InputContainer>

            <!--    orderQuantity        -->
            <InputContainer
              input-id="orderQuantity"
              input-label="orderQuantity"
            >
              <input
                id="validationOrderQuantity"
                :value="orderQuantity"
                class="form-control shadow-sm"
                disabled
                readonly
                type="text"
              />
            </InputContainer>

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
                    !packSizeQuantityMeta.valid &&
                    packSizeQuantityMeta.validated,
                }"
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
                    !pricePerPackSizeMeta.valid &&
                    pricePerPackSizeMeta.validated,
                }"
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
                  'is-invalid':
                    !expiryDateMeta.valid && expiryDateMeta.validated,
                }"
                class="form-control"
                name="expiryDate"
                required
                type="date"
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
                class="form-control"
                name="issueUnitPerPackSize"
                required
                type="text"
              />
            </InputContainer>
          </div>
        </div>

        <!--    Tables section    -->
        <hr class="my-1" />
        <div class="col-md-12 col-sm-6 mb-3">
          <!--          <TableContainer :field-names="orderAttributes" :records="orders" @clicked-row="onClickedRowHandler">-->
          <TableContainer skin="light">
            <TableHead class="sticky-top">
              <PlainTableHeader :field-names="orderAttributes" scope="col" />
              <th>Action</th>
            </TableHead>
            <TableBody>
              <TableRow
                :col-count="orderAttributes.length + 1"
                :records="orders"
              >
                <template #default="{ record }">
                  <PlainTableData
                    :field-names="orderAttributes"
                    :record="record"
                  />
                  <td class="text-center">
                    <button
                      class="btn btn-primary btn-sm px-2"
                      @click="onRowClick(record)"
                    >
                      select
                    </button>
                  </td>
                </template>
              </TableRow>
            </TableBody>
          </TableContainer>
        </div>
      </div>
      <FormButtonsContainer>
        <FormButton skin="primary" text="Add" @click="onAddAndNewClick" />
        <!--        <FormButton-->
        <!--          skin="secondary"-->
        <!--          text="add & Vew"-->
        <!--          @click="onAddAndNewClick"-->
        <!--        />-->
        <FormButton
          outline
          skin="dark"
          text="Add & View"
          @click="onAddAndView"
        />
        <FormButton
          outline
          skin="secondary"
          text="Add & View All"
          @click="onAddAndViewAll"
        />
        <FormButton outline skin="danger" text="clear" @click="onClear" />
      </FormButtonsContainer>
    </form>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast
          ref="toastSuccess"
          skin="info"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import TableContainer from "@/components/table/TableContainer.vue";
import TableHead from "@/components/table/TableHead.vue";
import PlainTableHeader from "@/components/table/plain/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableRow from "@/components/table/TableRow.vue";
import PlainTableData from "@/components/table/plain/TableData.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { Ref } from "vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import { useField } from "vee-validate";
import { useIsNumeric } from "@/composables/is-numeric";
import moment from "moment";
import { useRouter } from "vue-router";
import type { NewPurchaseDto } from "@/stores/app/purchases/dto";
import { usePurchasesStore } from "@/stores/app/purchases/purchases";

const router = useRouter();

const ordersStore = useOrdersStore();
const purchasesStore = usePurchasesStore();

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

const orders: Ref<OrderDto[]> = ref([]);
const orderQuantity: Ref<number> = ref(0);
const totalPackSizePrice: Ref<number> = ref(0);
const OrderId: Ref<string> = ref("");
const percentageProfit: Ref<number> = ref(0);

try {
  orders.value = await ordersStore.fetchOrders();
  percentageProfit.value = await purchasesStore.fetchPurchaseProfitPercentage();
} catch (error: any) {
  console.error(error);

  if (error.message === "Forbidden resource") {
    router.push({
      name: "un-authorized",
      params: { action: "add-purchase" },
    });
  }

  toastError.value?.setupToast({
    name: "Fetch Orders Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Orders Error",
    text: "Failed to fetch orders from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const onRowClick = (record: OrderDto) => {
  orderQuantity.value = record.orderQuantity;
  Medicine.value = record.medicine;
  Supplier.value = record.supplier;
  OrderId.value = record.id;
};

onMounted(() => {
  orderAttributes.value = Object.keys(orders.value[0]).filter(
    (value) => value !== "id"
  );
});

onUpdated(() => {
  // orderQuantity.value = orders.value[0].orderQuantity;
  if (packSizeQuantityMeta.valid && pricePerPackSizeMeta.valid) {
    totalPackSizePrice.value =
      +packSizeQuantity.value * +pricePerPackSize.value;
  }
});

const medicines = ref(orders.value.map((value) => value.medicine));

const suppliers = ref(orders.value.map((value) => value.supplier));

const orderAttributes: Ref<string[]> = ref([]);

const MedicineIdValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (
    !medicines.value.some((value1) =>
      value1.toLowerCase().includes(value.toLowerCase())
    )
  )
    return "The medicine should be one of the ones on the table";

  return true;
};

const SupplierIdValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (
    !suppliers.value.some((value1) =>
      value1.toLowerCase().includes(value.toLowerCase())
    )
  )
    return "The supplier should be one of the ones on the table";

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

  if (new Date(value) < new Date()) return "Enter a valid date.";

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
  value: Medicine,
  errorMessage: MedicineIdErrorMessage,
  meta: MedicineIdMeta,
} = useField("MedicineId", MedicineIdValidation);

const {
  value: Supplier,
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

const MedicinePlaceholder = ref("");
const SupplierPlaceholder = ref("");

const realOrdersMed = ref([...orders.value]);

watch(Medicine, (value) => {
  orders.value = realOrdersMed.value.filter((value1) => {
    if (value1) {
      const searchValue = value1.medicine.toLowerCase();
      return searchValue.includes(value.toLowerCase());
    }
    return true;
  });
  MedicinePlaceholder.value = orders.value[0]?.medicine;
});

const realOrdersSup = ref([...orders.value]);

watch(Supplier, (value) => {
  orders.value = realOrdersSup.value.filter((value1) => {
    if (value1) {
      const searchValue = value1.supplier.toLowerCase();
      return searchValue.includes(value.toLowerCase());
    }
    return true;
  });

  SupplierPlaceholder.value = orders.value[0]?.supplier;
});

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
      name: "Add Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Purchase Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createPurchasePayload = () => {
  const payload: NewPurchaseDto = {
    purchasedPackSizeQuantity: +packSizeQuantity.value,
    pricePerPackSize: +pricePerPackSize.value,
    OrderId: OrderId.value,
    issueUnitPerPackSize: +issueUnitPerPackSize.value,
    expiryDate: new Date(expiryDate.value),
  };

  return payload;
};

const addPurchase = async (payload: NewPurchaseDto) => {
  try {
    const purchase = await purchasesStore.addPurchase(payload);

    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Purchase",
      text: "Added the purchase successfully!",
      delay: 3000,
    });

    toastSuccess.value?.show();

    return purchase;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Add Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Purchase Error",
      text: "Failed to add the purchase. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");
//
// const onAddClick = async () => {
//   if (validateForm()) await addPurchase(createPurchasePayload());
// };

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addPurchase(createPurchasePayload());

    // select the form using the formRef
    const form = formRef.value as HTMLFormElement;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const purchase = await addPurchase(createPurchasePayload());

    routeRedirect.value = `/purchases/${purchase?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addPurchase(createPurchasePayload());

    routeRedirect.value = "/purchases";
  }
};

const onClear = () => {
  // set the value of the orders to it's initial value
  orders.value = realOrdersMed.value;

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
