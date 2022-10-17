<template>
  <section :class="`manage-${status}`">
    <SearchTable
      :attributes="salesStore.getAllSaleAttributes"
      :null-comment="`No ${startCase(status)} sales found`"
      :records="sales"
      :user-roles="userRoles"
      name="sale"
      no-action
      search-by="customer"
      search-term="customer"
    />
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SaleDto } from "@/stores/app/sales/dto";
import startCase from "lodash/startCase";
import moment from "moment";
import { useCurrencyFormatter } from "@/composables/currency-formatter";

interface ViewSalesStatusProps {
  status: "issued" | "cancelled" | "pending";
}

const userRoles: Ref<string[]> = ref(["admin", "chiefPharmacist"]);

const props = defineProps<ViewSalesStatusProps>();

const salesStore = useSalesStore();

const sales: Ref<SaleDto[]> = ref([]);

const toastError: Ref<InstanceType<LiveToast>> = ref();

try {
  switch (props.status) {
    case "issued":
      sales.value = await salesStore.fetchIssuedSales();
      sales.value = sales.value.map((value) => {
        value.issueUnitPrice = useCurrencyFormatter(
          +value.issueUnitPrice
        ).value;
        value.totalPrice = useCurrencyFormatter(+value.totalPrice).value;
        if (value.amountReceived)
          value.amountReceived = useCurrencyFormatter(
            +value.amountReceived
          ).value;
        return value;
      });
      break;
    case "cancelled":
      sales.value = await salesStore.fetchCancelledSales();
      sales.value = sales.value.map((value) => {
        value.issueUnitPrice = useCurrencyFormatter(
          +value.issueUnitPrice
        ).value;
        value.totalPrice = useCurrencyFormatter(+value.totalPrice).value;
        if (value.amountReceived)
          value.amountReceived = useCurrencyFormatter(
            +value.amountReceived
          ).value;
        return value;
      });
      break;
    case "pending":
      sales.value = await salesStore.fetchPendingSales();
      sales.value = sales.value.map((value) => {
        value.issueUnitPrice = useCurrencyFormatter(
          +value.issueUnitPrice
        ).value;
        value.totalPrice = useCurrencyFormatter(+value.totalPrice).value;
        if (value.amountReceived)
          value.amountReceived = useCurrencyFormatter(
            +value.amountReceived
          ).value;
        return value;
      });
      break;
  }
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: `Fetch ${startCase(props.status)} Sales Error`,
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: `Fetch ${startCase(props.status)} Sales Error`,
    text: `Failed to fetch ${startCase(props.status)} sales from the server`,
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
