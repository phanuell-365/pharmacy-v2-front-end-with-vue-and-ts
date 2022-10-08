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
        <ButtonIcon
          :icon-name="VIEW_ICON"
          skin="success"
          @click="onGetSaleIdClick(recordId)"
        />
        <!--        <ButtonLinkIcon :href="`/sales/${recordId}`" action="view" />-->
        <!--        <ButtonLinkIcon :href="`/sales/${recordId}/update`" action="update" />-->
        <!--        <ButtonLinkIcon :href="`/sales/${recordId}`" action="delete" />-->
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
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import { VIEW_ICON } from "@/constants/icons";
import { TOP_CENTER } from "@/constants/toasts";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SalesDto, SalesWithCustomerIdDto } from "@/stores/app/sales/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const salesStore = useSalesStore();

const sales: Ref<SalesDto[]> = ref([]);
const salesWithIds: Ref<SalesWithCustomerIdDto[]> = ref([]);

const toastSuccess = ref();
const toastError = ref();

try {
  sales.value = await salesStore.fetchSales();
  salesWithIds.value = await salesStore.fetchSalesWithId();
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

const onGetSaleIdClick = (saleId: string) => {
  const sale = salesWithIds.value.find((value) => value.id === saleId);

  router.push(`/sales/customer/${sale?.CustomerId}`);
};
</script>

<style scoped></style>
