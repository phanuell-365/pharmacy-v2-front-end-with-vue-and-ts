<template>
  <section :class="`manage-${category}`">
    <SearchTable
      :attributes="attributes"
      :null-comment="`No medicines found`"
      :records="medicines"
      name="medicine"
      no-action
      search-by="name"
      search-term="medicine"
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
import {
  ExpiredMedicine,
  OutOfStockMedicine,
  useStocksStore,
} from "@/stores/app/stock/stocks";
import type { Ref } from "vue";
import { ref } from "vue";
import startCase from "lodash/startCase";
import moment from "moment";

interface MedicineCategoryProps {
  category: "expired" | "out-of-stock";
}

const props = defineProps<MedicineCategoryProps>();

const stockStore = useStocksStore();

const toastError: Ref<InstanceType<LiveToast>> = ref();

const medicines: Ref<ExpiredMedicine[] | OutOfStockMedicine[]> = ref([]);
const attributes: Ref<string[]> = ref([]);

try {
  switch (props.category) {
    case "expired":
      {
        medicines.value = await stockStore.fetchExpiredMedicines();
        attributes.value = stockStore.getExpiredMedicinesAttributes;
      }
      break;
    case "out-of-stock": {
      medicines.value = await stockStore.fetchMedicineOutOfStock();
      attributes.value = stockStore.getOutOfStockMedicinesAttributes;
    }
  }
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: `Fetch ${startCase(props.category)} Medicines Error`,
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: `Fetch ${startCase(props.category)} Medicines Error`,
    text: `Failed to fetch ${startCase(
      props.category
    )} medicines from the server`,
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
