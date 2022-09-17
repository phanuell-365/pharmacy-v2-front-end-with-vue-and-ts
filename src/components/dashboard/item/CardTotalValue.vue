<template>
  <h5
    :class="{'text-success': totalValue >500, 'text-dark': totalValue <= 300 && totalValue >10 , 'text-danger': totalValue <= 10}"
    class="lead fs-3">
    {{ totalValue }}
  </h5>
</template>

<script lang="ts" setup>

interface CardTotalValueProps {
  totalValue: number;
}

const props = defineProps<CardTotalValueProps>();


</script>

<style scoped>

</style>
