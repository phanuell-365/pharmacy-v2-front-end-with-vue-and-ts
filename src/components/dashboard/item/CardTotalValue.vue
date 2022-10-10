<template>
  <h5
    :class="{
      'text-success': totalValue > 500,
      'text-dark': totalValue <= 300 && totalValue > 5,
      'text-danger': totalValue <= 5,
    }"
    class="lead fs-3"
  >
    {{ totalValue }}
  </h5>
</template>

<script lang="ts" setup>
interface CardTotalValueProps {
  totalValue: number;
}

defineProps<CardTotalValueProps>();
</script>

<style scoped></style>
