<template>
  <section class="row">
    <form autocomplete="off" novalidate @submit.prevent>
      <div class="col-lg-12 col-md-12 bg-light my-1 rounded shadow-sm">
        <div class="row g-3">
          <div class="col-lg-9 col-md-9">
            <div class="col-lg-4 col-md-4">
              <SearchPanel
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
                  Kshs. {{ amountReceived }}
                </h4>
              </div>
              <div class="col-lg-12 col-md-12">
                <label class="lead fs-6">Amount: </label>
                <input
                  id="amount"
                  v-model="amountReceived"
                  class="form-control"
                  name="amount"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-3" />
      <div class="col-lg-12 col-md-12">
        <!--        <h6 class="fs-6 fw-semibold">Select a medicine: </h6>-->
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="row my-1 align-baseline">
              <!--              <template v-if="updateMode">-->
              <!--                <InputContainer input-id="medicineFound" input-label="medicine">-->
              <!--                  <input id="medicineFound" v-model="updateMedicineName" class="form-control" disabled name="medicine"-->
              <!--                         type="text">-->
              <!--                </InputContainer>-->
              <!--              </template>-->
              <!--              <template v-else>-->
              <div class="col-lg-4 col-md-4">
                <SearchPanel
                  ref="medicineSearchPanelRef"
                  :filter-array="medicineSearchPairs"
                  label="medicine"
                  name="medicine"
                  @on-found-item="onFoundMedicineItem"
                />
              </div>
              <!--              </template>-->
              <!--              <template v-if="updateMode">-->
              <!--                <InputContainer :invalid-feedback="newIssueUnitQuantityErrorMessage" input-id="issueUnitQuantity"-->
              <!--                                input-label="issueUnitQuantity">-->
              <!--                  <input id="validationUpdateIssueUnitQuantity" ref="issueUnitQuantityRef"-->
              <!--                         v-model="newIssueUnitQuantity"-->
              <!--                         :autofocus="updateMode"-->
              <!--                         :class="{'is-invalid': !newIssueUnitQuantityMeta.valid && newIssueUnitQuantityMeta.validated}"-->
              <!--                         class="form-control" name="issueUnitQuantity"-->
              <!--                         required-->
              <!--                         type="text">-->
              <!--                </InputContainer>-->
              <!--              </template>-->
              <!--              <template>-->
              <InputContainer
                :invalid-feedback="issueUnitQuantityErrorMessage"
                input-id="issueUnitQuantity"
                input-label="issueUnitQuantity"
              >
                <input
                  id="validationIssueUnitQuantity"
                  ref="issueUnitQuantityRef"
                  v-model="issueUnitQuantity"
                  :class="{
                    'is-invalid':
                      !issueUnitQuantityMeta.valid &&
                      issueUnitQuantityMeta.validated,
                  }"
                  :disabled="!addMode"
                  class="form-control"
                  name="issueUnitQuantity"
                  required
                  type="text"
                />
              </InputContainer>
              <!--              </template>-->
              <div class="col-lg-4 col-md-4 m-auto mt-4 pt-3">
                <FormButton
                  :disabled="
                    !issueUnitQuantityMeta.validated &&
                    !issueUnitQuantityMeta.valid
                  "
                  skin="primary"
                  text="Add Item"
                  @click="addMedicineToSelectedMedicine"
                />
                <FormButton
                  skin="info"
                  text="add"
                  @click="onShowAddItemModalClick"
                />
              </div>
              <!--              </template>-->
            </div>
          </div>
          <div class="col-lg-12 col-md-12">
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
                        <!--                        <template v-if="updateMode && record.id === foundMedicineId">-->
                        <!--                          <FormButton skin="secondary" text="Update" @click="onUpdateCustomerOrder" />-->
                        <!--                        </template>-->
                        <!--                        <template v-else>-->
                        <ButtonIcon
                          :icon-name="UPDATE_ICON"
                          class="mx-1"
                          skin="secondary"
                          @click="onSetUpdateModeClick(record.id)"
                        />
                        <ButtonIcon
                          :icon-name="DELETE_ICON"
                          class="mx-1"
                          skin="danger"
                          @click="onRemoveCustomerOrder(record.id)"
                        />
                        <!--                        </template>-->
                      </div>
                    </td>
                  </template>
                </TableRow>
              </TableBody>
            </TableContainer>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <AddItem ref="addItemModal" />
        <UpdateItem ref="updateItemModal" />
        <!--   Action Modal     -->
        <ActionModal ref="updateCustomerOrderModal">
          <template #modal-body>
            <div class="row">
              <p class="fs-5 fw-semibold">
                Please enter the new issue unit quantity
              </p>
              <div class="row mb-3">
                <label
                  class="col-sm-2 col-form-label fs-6 fw-semibold"
                  for="colFormLabel"
                  >Quantity</label
                >
                <div class="col-sm-10 m-auto">
                  <input
                    id="validationUpdateIssueUnitQuantity"
                    ref="newIssueUnitQuantityRef"
                    v-model="newIssueUnitQuantity"
                    :autofocus="updateMode"
                    :class="{
                      'is-invalid':
                        !newIssueUnitQuantityMeta.valid &&
                        newIssueUnitQuantityMeta.validated,
                    }"
                    autocomplete="off"
                    class="form-control"
                    name="issueUnitQuantity"
                    required
                    type="text"
                  />
                  <div class="invalid-feedback">
                    {{ newIssueUnitQuantityErrorMessage }}
                  </div>
                  <!--                  <input id="newIssueQuantity" class="form-control m-auto" name="newIssueQuantity" type="text">-->
                </div>
              </div>
            </div>
          </template>
          <template #modal-buttons>
            <FormButton
              skin="secondary"
              text="Update"
              @click="onUpdateCustomerOrder"
            />
            <FormButton skin="danger" text="Cancel" />
          </template>
        </ActionModal>

        <ToastContainer :placement="TOP_CENTER">
          <LiveToast ref="toastSuccess" skin="info" />
          <LiveToast ref="toastError" skin="danger" />
        </ToastContainer>
      </Teleport>
    </form>
  </section>
</template>

<script lang="ts" setup>
import SearchPanel from "@/components/search/SearchPanel.vue";
import InputContainer from "@/components/form/InputContainer.vue";
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
import ActionModal from "@/components/modal/ActionModal.vue";
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
import { useStocksStore } from "@/stores/app/stock/stocks";
import type { StockDto } from "@/stores/app/stock/dto";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";
import moment from "moment";

const customersStore = useCustomersStore();
const medicineStore = useMedicinesStore();
const stocksStore = useStocksStore();
const customersOrdersStore = useCustomersOrdersStore();

const customers: Ref<CustomerDto[]> = ref([]);
const medicines: Ref<MedicineDto[]> = ref([]);
const stocks: Ref<StockDto[]> = ref([]);

const toastSuccess = ref();
const toastError = ref();
const medicineSearchPanelRef = ref();
const updateCustomerOrderModal = ref();
const newIssueUnitQuantityRef: Ref<HTMLInputElement | null> = ref(null);

customers.value = await customersStore.fetchCustomers();
medicines.value = await medicineStore.fetchMedicines();
stocks.value = await stocksStore.fetchStocks();

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
const foundMedicineId = ref("");
const foundMedicineName = ref("");

const foundCustomer: Ref<CustomerDto | undefined> = ref();
const foundMedicine: Ref<MedicineDto | null | undefined> = ref(null);

const disableIssueUnitQuantity = ref(true);

const onFoundCustomerItem = (item: SearchPairs) => {
  foundCustomerId.value = item.id;
  foundCustomer.value = customers.value.find(
    (value) => value.id === foundCustomerId.value
  );
};

const addMode = ref(false);
const addItemModal = ref();
const updateItemModal = ref();

const onFoundMedicineItem = (item: SearchPairs) => {
  addMode.value = true;
  disableIssueUnitQuantity.value = false;
  foundMedicineId.value = item.id;
  foundMedicineName.value = item.name;
  foundMedicine.value = medicines.value.find(
    (value) => value.id === foundMedicineId.value
  );
};

const amountReceived = ref(0);

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

// const issueUnitQuantityRef: Ref<HTMLInputElement | null> = ref(null);

const issueUnitQuantityValidation = (value: string) => {
  if (addMode.value) {
    if (!value) return "This is a required field";

    if (!useIsNumeric(value).value)
      return "The issue unit quantity should be a number";

    if (+value <= 0) {
      return "The issue unit quantity not be less than or equal to 0";
    }
  }
  return true;
};

const {
  value: issueUnitQuantity,
  errorMessage: issueUnitQuantityErrorMessage,
  meta: issueUnitQuantityMeta,
} = useField("issueUnitQuantity", issueUnitQuantityValidation);

const newIssueUnitQuantityValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (!useIsNumeric(value).value)
    return "The issue unit quantity should be a number";

  if (+value <= 0) {
    return "The issue unit quantity not be less than or equal to 0";
  }

  return true;
};

const {
  value: newIssueUnitQuantity,
  errorMessage: newIssueUnitQuantityErrorMessage,
  meta: newIssueUnitQuantityMeta,
} = useField("newIssueUnitQuantity", newIssueUnitQuantityValidation);

customersOrders.value = customersOrdersStore.getItems;

const addMedicineToSelectedMedicine = () => {
  addMode.value = false;

  disableIssueUnitQuantity.value = true;

  toastError.value?.setupToast({
    name: "Add customer order",
    elapsedDuration: moment().startOf("seconds").fromNow(),
    heading: "Add Customer Order",
    text: "The item is already present in the order! Did you mean to update ?",
    delay: 6000,
  });

  // check if the name of the medicine to be added already exists
  if (
    customersOrdersStore.getItemNames.includes(
      foundMedicine.value?.name as string
    ) ||
    !foundMedicine.value
  )
    toastError.value?.show();
  else
    customersOrdersStore.addItem({
      id: foundMedicineId.value,
      name: foundMedicine.value?.name as string,
      quantity: +issueUnitQuantity.value,
    });

  foundMedicine.value = null;
  foundMedicineId.value = "";
  issueUnitQuantity.value = "";

  customersOrders.value = customersOrdersStore.getItems;

  medicineSearchPanelRef.value?.clear();
};

const updateMode = ref(false);

const customerOrderItemToUpdate: Ref<CustomersOrders | undefined | null> =
  ref(null);

const onSetUpdateModeClick = (medicineOrderId: string) => {
  updateCustomerOrderModal.value?.setUpModal({
    title: "Update Medicine Quantity!",
  });

  customerOrderItemToUpdate.value = customersOrdersStore.getItems.find(
    (value) => value.id === medicineOrderId
  );

  newIssueUnitQuantity.value =
    customerOrderItemToUpdate.value?.quantity.toString() as string;

  updateItemModal.value?.setMedicineOrderId(medicineOrderId);
  updateItemModal.value?.showModal();
  updateItemModal.value?.hideModal();

  // updateCustomerOrderModal.value?.showModal();
  //
  // updateCustomerOrderModal.value?.setFocus(newIssueUnitQuantityRef.value);

  // newIssueUnitQuantityRef.value?.focus();

  // issueUnitQuantityRef.value?.focus();
  //
  // if (medicineOrder) {
  //   newIssueUnitQuantity.value = medicineOrder.quantity.toString();
  //   updateMedicineName.value = medicineOrder.medicine;
  // }
};

const onUpdateCustomerOrder = () => {
  if (newIssueUnitQuantityMeta.valid && newIssueUnitQuantityMeta.validated) {
    customersOrdersStore.updateItemQuantity({
      id: customerOrderItemToUpdate.value?.id as string,
      quantity: +newIssueUnitQuantity.value,
    });

    updateCustomerOrderModal.value?.hideModal();
  } else {
    newIssueUnitQuantityMeta.valid = false;
    newIssueUnitQuantityErrorMessage.value =
      "Please enter the issue unit quantity!";
  }
  // issueUnitQuantity.value = "";
  // issueUnitQuantityMeta.valid = true;
  // issueUnitQuantityMeta.validated = false;
};

const onRemoveCustomerOrder = (customerOrderId: string) => {
  customersOrdersStore.removeItem(customerOrderId);
  customersOrders.value = customersOrdersStore.getItems;
};

const onShowAddItemModalClick = () => {
  addItemModal.value?.showModal();
};
</script>
<style scoped>
#validationUpdateIssueUnitQuantity,
#validationIssueUnitQuantity {
  width: 250px;
}
</style>
