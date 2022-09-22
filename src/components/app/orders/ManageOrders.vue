<template>
  <section class="manage-orders">
    <SearchTable :attributes="ordersStore.getOrderAttributes" :records="orders" name="medicine"
                 null-comment="Order not found"
                 search-by="medicine">
      <template #actions="{recordId}">
        <ButtonLinkIcon :href="`/orders/${recordId}`" action="view" />
        <ButtonLinkIcon :href="`/orders/${recordId}/update`" action="update" />
        <ButtonLinkIcon :href="`/orders/${recordId}`" action="delete" />
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
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { Ref } from "vue";
import { ref } from "vue";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import moment from "moment";

const ordersStore = useOrdersStore();

const orders: Ref<OrderDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

try {
  orders.value = await ordersStore.fetchOrders();
} catch (error: any) {

  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Orders Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Orders Error",
    text: "Failed to fetch orders from the server",
    delay: 5000
  });

  toastError.value?.show();
}
</script>

<style scoped>

</style>
