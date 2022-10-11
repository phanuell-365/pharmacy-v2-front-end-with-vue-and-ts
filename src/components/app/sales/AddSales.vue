<template>
  <section class="row">
    <form ref="formRef" autocomplete="off" novalidate @submit.prevent>
      <div class="col-lg-12 col-md-12 bg-light my-1 rounded shadow-sm">
        <div class="row g-3">
          <div class="col-lg-9 col-md-9">
            <div class="col-lg-4 col-md-4">
              <SearchPanel
                ref="customerSearchPanelRef"
                :filter-array="customerSearchPairs"
                class="mx-2"
                label="customer"
                name="customer"
                @on-found-item="onFoundCustomerItem"
              />
            </div>
          </div>
          <div class="col-lg-3 col-md-3">
            <div class="row my-3 me-3">
              <div class="col-lg-12 col-md-12 mb-3 text-end">
                <h6 class="fs-6">Amount Received</h6>
                <h4 class="fs-4 fw-bold text-muted">
                  Kshs.
                  <template v-if="amountReceivedMeta.valid">
                    {{ amountReceived }}
                  </template>
                </h4>
              </div>
              <div class="col-lg-12 col-md-12">
                <label class="lead fs-6" for="amount">Amount: </label>
                <input
                  id="amount"
                  v-model="amountReceived"
                  :class="{
                    'is-invalid':
                      !amountReceivedMeta.valid && amountReceivedMeta.validated,
                  }"
                  class="form-control"
                  name="amount"
                  type="text"
                />
                <div class="invalid-feedback">
                  {{ amountReceivedErrorMessage }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-3" />
      <div class="col-lg-12 col-md-12">
        <h6 class="fs-6 fw-semibold">Click to add medicine to the order</h6>
        <div class="row">
          <div class="text-start my-2">
            <FormButton
              skin="primary"
              text="Add item"
              @click="onShowAddItemModalClick"
            />
          </div>
          <TableContainer skin="light">
            <TableHead>
              <PlainTableHeader
                :field-names="customersOrdersAttributes"
                scope="col"
              />
              <th>Actions</th>
            </TableHead>
            <TableBody>
              <TableRow
                :col-count="customersOrdersAttributes.length + 1"
                :records="customersOrders"
                null-comment="No medicine selected"
              >
                <template #default="{ record }">
                  <PlainTableData
                    :field-names="customersOrdersAttributes"
                    :record="record"
                  />
                  <td>
                    <div class="text-center">
                      <ButtonIcon
                        :icon-name="UPDATE_ICON"
                        class="mx-1"
                        skin="secondary"
                        @click="onUpdateCustomerOrderClick(record.id)"
                      />
                      <ButtonIcon
                        :icon-name="DELETE_ICON"
                        class="mx-1"
                        skin="danger"
                        @click="onRemoveCustomerOrder(record.id)"
                      />
                    </div>
                  </td>
                </template>
              </TableRow>
            </TableBody>
          </TableContainer>
          <div class="text-end">
            <h6 class="fs-6 my-2">
              <span class="fw-semibold lead"> Total Cost </span>
              <span class="border p-2 rounded">
                Kshs. {{ customersOrdersStore.totalCost }}</span
              >
            </h6>
          </div>
          <FormButtonContainer class="my-2">
            <FormButton skin="primary" text="Add" @click="onAddAndNewClick" />
            <!--            <FormButton-->
            <!--              skin="secondary"-->
            <!--              text="add & new"-->
            <!--              @click="onAddAndNewClick"-->
            <!--            />-->
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
            <FormButton outline skin="danger" text="Clear" @click="onClear" />
          </FormButtonContainer>
        </div>
      </div>
      <Teleport to="body">
        <AddItem ref="addItemModal" />
        <UpdateItem ref="updateItemModal" />
        <ToastContainer :placement="TOP_CENTER">
          <LiveToast
            ref="toastSuccess"
            skin="info"
            @on-hidden-bs-toast="onHiddenBsToast"
          />
          <LiveToast ref="toastError" skin="danger" />
        </ToastContainer>
      </Teleport>
    </form>
  </section>
</template>

<script lang="ts" setup>
import SearchPanel from "@/components/search/SearchPanel.vue";
import FormButtonContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import TableContainer from "@/components/table/TableContainer.vue";
import TableHead from "@/components/table/TableHead.vue";
import PlainTableHeader from "@/components/table/plain/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableRow from "@/components/table/TableRow.vue";
import PlainTableData from "@/components/table/plain/TableData.vue";
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import AddItem from "./AddItem.vue";
import UpdateItem from "./UpdateItem.vue";
import { DELETE_ICON, UPDATE_ICON } from "@/constants/icons";
import { TOP_CENTER } from "@/constants/toasts";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
// import { useStocksStore } from "@/stores/app/stock/stocks";
// import type { StockDto } from "@/stores/app/stock/dto";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";
import type { NewSaleDto, NewSalesDto } from "@/stores/app/sales/dto";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import moment from "moment";
import { useSalesStore } from "@/stores/app/sales/sales";

const router = useRouter();

const customersStore = useCustomersStore();
const medicineStore = useMedicinesStore();
// const stocksStore = useStocksStore();
const customersOrdersStore = useCustomersOrdersStore();
const salesStore = useSalesStore();

const customers: Ref<CustomerDto[]> = ref([]);
const medicines: Ref<MedicineDto[]> = ref([]);
// const stocks: Ref<StockDto[]> = ref([]);

const formRef: Ref<HTMLFormElement | null> = ref(null);
const customerSearchPanelRef: Ref<
  InstanceType<SearchPanel> | null | undefined
> = ref();
const toastSuccess = ref();
const toastError = ref();

customers.value = await customersStore.fetchCustomers();
medicines.value = await medicineStore.fetchMedicines();

// stocks.value = await stocksStore.fetchStocks();

interface SearchPairs {
  name: string;
  id: string;
}

const customerSearchPairs: Ref<SearchPairs[]> = ref([]);
const medicineSearchPairs: Ref<SearchPairs[]> = ref([]);

customerSearchPairs.value = customers.value.map((value) => ({
  name: value.name,
  id: value.id,
}));
medicineSearchPairs.value = medicines.value.map((value) => ({
  name: value.name,
  id: value.id,
}));

const foundCustomerId = ref("");

const foundCustomer: Ref<CustomerDto | undefined> = ref();

const onFoundCustomerItem = (item: SearchPairs) => {
  foundCustomerId.value = item.id;
  foundCustomer.value = customers.value.find(
    (value) => value.id === foundCustomerId.value
  );
};

const addItemModal = ref();
const updateItemModal = ref();

interface CustomersOrders {
  id: string;
  medicine: string;
  doseForm: string;
  price: number;
  quantity: number;
  totalPrice: number;
  levelOfUse: number;
  expiryDate: string;
}

const customersOrders: Ref<CustomersOrders[]> = ref([]);
const customersOrdersAttributes: Ref<string[]> = ref([]);

customersOrdersAttributes.value = customersOrdersStore.getAttributes;

const onUpdateCustomerOrderClick = (medicineOrderId: string) => {
  updateItemModal.value?.setMedicineOrderId(medicineOrderId);
  updateItemModal.value?.showModal();
  updateItemModal.value?.hideModal();
};

const onRemoveCustomerOrder = (customerOrderId: string) => {
  customersOrdersStore.removeItem(customerOrderId);
  customersOrders.value = customersOrdersStore.getItems;
};

const onShowAddItemModalClick = () => {
  customersOrders.value = customersOrdersStore.getItems;
  addItemModal.value?.showModal();
};

const amountReceivedValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (!useIsNumeric(value).value)
    return "The amount received should be a number";

  if (+value <= 0) {
    return "The amount received not be less than or equal to 0";
  }

  if (+value < customersOrdersStore.getTotalCost) {
    return "The amount received is less than the total price";
  }

  if (+value > customersOrdersStore.getTotalCost) {
    return "The amount received is greater than the total price";
  }

  return true;
};

const {
  value: amountReceived,
  errorMessage: amountReceivedErrorMessage,
  meta: amountReceivedMeta,
} = useField("amountReceived", amountReceivedValidation);

const validateForm = () => {
  if (amountReceivedMeta.valid && foundCustomer.value) {
    return true;
  } else {
    toastError.value?.setupToast({
      name: "Add Sales Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Sales Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();

    return false;
  }
};

const createSalesPayload = () => {
  const customersOrdersArray: Ref<NewSaleDto[]> = ref(
    customersOrdersStore.items.map((value) => {
      const cusOrder: NewSaleDto = {
        issueUnitQuantity: value.quantity,
        MedicineId: value.id,
        CustomerId: foundCustomerId.value,
        amountReceived: +amountReceived.value,
      };

      return cusOrder;
    })
  );

  const payload: NewSalesDto = {
    sales: customersOrdersArray.value,
  };

  return payload;
};

const addSales = async (payload: NewSalesDto) => {
  try {
    const sales = await salesStore.addSales(payload);

    toastSuccess.value?.setupToast({
      name: "Add Sales",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Sales",
      text: "Added the sales successfully!",
      delay: 3000,
    });

    toastSuccess.value?.show();

    customersOrdersStore.$reset();

    return sales;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Add Sales Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Sales Error",
      text: "Failed to add the sales. " + error.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

// const onAddClick = async () => {
//   if (validateForm()) await addSales(createSalesPayload());
// };

const onAddAndNewClick = async () => {
  if (validateForm()) {
    await addSales(createSalesPayload());

    // select the form using the formRef
    const form = formRef.value;

    // call reset
    form?.reset();
  }
};

const onAddAndView = async () => {
  if (validateForm()) {
    const sales = await addSales(createSalesPayload());

    routeRedirect.value = `/sales/${sales?.id}`;
  }
};

const onAddAndViewAll = async () => {
  if (validateForm()) {
    await addSales(createSalesPayload());

    routeRedirect.value = "/sales";
  }
};

const onClear = () => {
  // select the form using the formRef
  const form = formRef.value as HTMLFormElement;

  // call reset
  form?.reset();

  customerSearchPanelRef.value?.clear();
  foundCustomer.value = undefined;
  foundCustomerId.value = "";
};

const onHiddenBsToast = () => {
  if (routeRedirect.value === "current") router.go(0);

  router.push(routeRedirect.value);
};

onBeforeRouteLeave(() => {
  customersOrdersStore.$reset();
});
</script>
<style scoped></style>
