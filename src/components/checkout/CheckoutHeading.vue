<template>
  <h4 class="d-flex justify-content-between align-items-center mb-3">
    <span class="text-primary small">Customer's Orders</span>
    <span class="badge bg-primary rounded-pill small">{{ numberOfItems }}</span>
  </h4>
</template>

<script lang="ts" setup>
interface CheckoutHeadingProps {
  numberOfItems: number;
}

defineProps<CheckoutHeadingProps>();
</script>

<style scoped>

</style>
