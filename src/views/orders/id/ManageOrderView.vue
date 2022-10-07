<template>
  <section></section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";

interface ManageOrderProps {
  orderId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageOrderProps>();

const ordersStore = useOrdersStore();

const order: Ref<OrderDto | null> = ref(null);

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

try {
  order.value = await ordersStore.fetchOrderById(props.orderId);
} catch (error: any) {
  console.log(error.message);

  if (error.message === "Order not found!") {
    router.push(`/errors/orders/${props.orderId}`);
  }
}
</script>

<style scoped></style>
