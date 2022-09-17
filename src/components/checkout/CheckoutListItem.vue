<template>
  <li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
      <h6 class="my-0">{{ productName }}</h6>
      <small class="text-muted">Click to remove item</small>
    </div>
    <span class="text-muted">Kshs. <span class="text-success">{{ productPrice }}</span></span>
  </li>
</template>

<script lang="ts" setup>
interface CheckoutListItemProps {
  productName: string;
  productPrice: number;
}

defineProps<CheckoutListItemProps>();
</script>

<style scoped>

</style>
