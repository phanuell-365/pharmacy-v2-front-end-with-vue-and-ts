<template>
  <section class="manage-stocks">
    <SearchTable
      :attributes="stocksStore.getStockAttributes"
      :records="stocks"
      name="stock"
      null-comment="Stock not found"
      search-by="medicine"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/stocks/${recordId}`" action="view" />
        <ButtonLinkIcon :href="`/stocks/${recordId}/update`" action="update" />
        <ButtonLinkIcon :href="`/stocks/${recordId}`" action="delete" />
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
import { useStocksStore } from "@/stores/app/stock/stocks";
import type { Ref } from "vue";
import { ref } from "vue";
import type { StockDto } from "@/stores/app/stock/dto";
import moment from "moment";

const stocksStore = useStocksStore();

const stocks: Ref<StockDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

try {
  stocks.value = await stocksStore.fetchStocks();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Stocks Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Stocks Error",
    text: "Failed to fetch stocks from the server",
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
