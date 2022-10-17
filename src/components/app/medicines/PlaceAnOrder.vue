<template>
  <section class="place-an-order">
    <SearchTable
      :attributes="medicinesStore.getMedicineStockAttributes"
      :records="medicines"
      :user-roles="userRoles"
      name="medicine"
      search-by="name"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <RouterLink
          :to="`/orders/create/${recordId}`"
          class="btn btn-info btn-hover btn-sm"
        >
          Place Order
        </RouterLink>
      </template>
    </SearchTable>
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
import type { Ref } from "vue";
import { ref } from "vue";
// import { useStocksStore } from "@/stores/app/stock/stocks";
import moment from "moment";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineStockDto } from "@/stores/app/medicines/dto/medicine-stock.dto";

// const stocksStore = useStocksStore();
const medicinesStore = useMedicinesStore();

const userRoles: Ref<string[]> = ref([
  "admin",
  "chiefPharmacist",
  "pharmacistAssistant",
]);

const medicines: Ref<MedicineStockDto[]> = ref([]);

const toastError: Ref<InstanceType<LiveToast>> = ref();

try {
  await medicinesStore.fetchMedicines();
  medicines.value = medicinesStore.medicineStock;
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: `Fetch Medicines Stocks Error`,
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: `Fetch Medicines Stocks Error`,
    text: `Failed to fetch stocks medicines from the server`,
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
