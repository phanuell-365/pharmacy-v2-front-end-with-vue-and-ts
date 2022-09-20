<template>
  <h4 class="d-flex justify-content-between align-items-center mb-3">
    <span class="text-primary small">{{ name }}'s Orders</span>
    <span class="badge bg-primary rounded-pill small">{{ customersOrdersStore.items.length }}</span>
  </h4>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";

const customersOrdersStore = useCustomersOrdersStore();

interface CheckoutHeadingProps {
  customerName?: string;
}

const props = defineProps<CheckoutHeadingProps>();

const name = computed(
  () => props.customerName ? props.customerName : "Customer"
);
</script>

<style scoped>

</style>
