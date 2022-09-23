<template>
  <section class="manage-medicines">
    <SearchTable
      :attributes="salesStore.getSalesAttributes"
      :records="sales"
      name="sale"
      null-comment="Sales not found"
      search-by="customer"
      search-term="customer"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/medicines/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/medicines/${recordId}/update`"
          action="update"
        />
        <ButtonLinkIcon :href="`/medicines/${recordId}`" action="delete" />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SalesDto } from "@/stores/app/sales/dto";
import moment from "moment";

const salesStore = useSalesStore();

const sales: Ref<SalesDto[]> = ref([]);

const toastSuccess = ref();
const toastError = ref();

try {
  sales.value = await salesStore.fetchSales();
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
</script>

<style scoped></style>
