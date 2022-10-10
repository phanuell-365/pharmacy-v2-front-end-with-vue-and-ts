<template>
  <section class="manage-sales-by-customer">
    <form
      ref="formRef"
      autocomplete="off"
      class="row g-3 m-4"
      novalidate
      @submit.prevent
    >
      <InputContainer input-id="customer" input-label="customer">
        <input
          id="validationCustomer"
          :value="customer?.name"
          class="form-control shadow-sm"
          disabled
          name="customer"
          readonly
          required
          type="text"
        />
      </InputContainer>

      <InputContainer input-id="amountReceived" input-label="amountReceived">
        <input
          id="validationAmountReceived"
          :value="amountReceived"
          class="form-control shadow-sm"
          disabled
          name="amountReceived"
          readonly
          required
          type="text"
        />
      </InputContainer>
    </form>

    <hr class="my-2" />

    <SearchTable
      :attributes="salesStore.getSaleAttributes"
      :records="sales"
      name="sale"
      null-comment="Sales not found"
      search-by="medicine"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/sales/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/sales/${recordId}?update=true`"
          action="update"
        />
        <ButtonIcon
          :icon-name="DELETE_ICON"
          class="mx-1"
          skin="danger"
          @click="onDeleteClick(recordId)"
        />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
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
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import InputContainer from "@/components/form/InputContainer.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { DELETE_ICON } from "@/constants/icons";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SaleDto } from "@/stores/app/sales/dto";
import moment from "moment";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useRouter } from "vue-router";

interface ManageSalesByCustomerProps {
  customerId: string;
}

const router = useRouter();

const props = defineProps<ManageSalesByCustomerProps>();

const salesStore = useSalesStore();
const customersStore = useCustomersStore();

const toastError: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const sales: Ref<SaleDto[]> = ref([]);
const customer: Ref<CustomerDto | null> = ref(null);
const amountReceived: Ref<number> = ref(0);

try {
  customer.value = await customersStore.fetchCustomerById(props.customerId);
  sales.value = await salesStore.fetchSalesByCustomerId(props.customerId);
  const totalAmountArr = sales.value.map((value) => value.totalPrice);

  amountReceived.value = totalAmountArr.reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue;
    }
  );
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Sales Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Sales Error",
    text: "Failed to fetch sales from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const response: Ref<string | undefined> = ref();

const selectedSale: Ref<SaleDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedSale.value = (await salesStore.fetchSaleById(recordId)) as SaleDto;

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this sale?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Sale Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Sale Error",
      text: "Failed to fetch sale from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onDeleteSale = async () => {
  try {
    response.value = await salesStore.deleteSale(
      selectedSale.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Sale Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Sale Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    sales.value = await salesStore.fetchSalesByCustomerId(props.customerId);
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
  router.go(0);
};
</script>

<style scoped></style>
