<template>
  <section class="manage-purchases">
    <SearchTable :attributes="purchasesStore.getPurchaseAttributes" :records="purchases" name="purchases"
                 null-comment="Purchase not found" search-by="medicine"
                 search-term="medicine">
      <template #actions="{recordId}">
        <ButtonLinkIcon :href="`/purchases/${recordId}`" action="view" />
        <ButtonLinkIcon :href="`/purchases/${recordId}/update`" action="update" />
        <ButtonLinkIcon :href="`/purchases/${recordId}`" action="delete" />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" @on-hidden-bs-toast="onHiddenBsToast" />
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
import { usePurchasesStore } from "@/stores/app/purchases/purchases";
import type { Ref } from "vue";
import { ref } from "vue";
import type { PurchaseDto } from "@/stores/app/purchases/dto";
import moment from "moment";

const purchasesStore = usePurchasesStore();

const purchases: Ref<PurchaseDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

try {
  purchases.value = await purchasesStore.fetchPurchases();
} catch (error: any) {

  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Purchases Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Purchases Error",
    text: "Failed to fetch purchases from the server",
    delay: 5000
  });

  toastError.value?.show();
}
</script>

<style scoped>

</style>
