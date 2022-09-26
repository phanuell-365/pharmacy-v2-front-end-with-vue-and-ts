<template>
  <section :class="`manage-${status}`">
    <SearchTable
      :attributes="salesStore.getSaleAttributes"
      :null-comment="`No ${startCase(status)} sales found`"
      :records="sales"
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

interface ViewSalesStatusProps {
  status: "issued" | "cancelled" | "pending";
}

const props = defineProps<ViewSalesStatusProps>();

const salesStore = useSalesStore();

const sales: Ref<SaleDto[]> = ref([]);

const toastError: Ref<InstanceType<LiveToast>> = ref();

try {
  switch (props.status) {
    case "issued":
      sales.value = await salesStore.fetchIssuedSales();
      break;
    case "cancelled":
      sales.value = await salesStore.fetchCancelledSales();
      break;
    case "pending":
      sales.value = await salesStore.fetchPendingSales();
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
