<template>
  <section :class="`manage-${status}`">
    <SearchTable
      :attributes="ordersStore.getOrderAttributes"
      :null-comment="`No ${startCase(status)} orders found`"
      :records="orders"
      name="order"
      no-action
      search-by="medicine"
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
import { useOrdersStore } from "@/stores/app/orders/orders";
import startCase from "lodash/startCase";
import type { Ref } from "vue";
import { ref } from "vue";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import moment from "moment";

const ordersStore = useOrdersStore();

interface ViewOrdersStatusProps {
  status: "delivered" | "cancelled" | "pending" | "active";
}

const props = defineProps<ViewOrdersStatusProps>();

const orders: Ref<OrderDto[]> = ref([]);

const toastError: Ref<InstanceType<LiveToast>> = ref();

try {
  switch (props.status) {
    case "active":
      orders.value = await ordersStore.fetchActiveOrders();
      break;
    case "cancelled":
      orders.value = await ordersStore.fetchCancelledOrders();
      break;
    case "pending":
      orders.value = await ordersStore.fetchPendingOrders();
      break;
    case "delivered":
      orders.value = await ordersStore.fetchDeliveredOrders();
      break;
  }
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: `Fetch ${startCase(props.status)} Orders Error`,
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: `Fetch ${startCase(props.status)} Orders Error`,
    text: `Failed to fetch ${startCase(props.status)} orders from the server`,
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
