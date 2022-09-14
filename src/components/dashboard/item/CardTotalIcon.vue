<template>
  <i :class="icon" class="fa-solid lead fs-4"></i>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface CardTotalProps {
  rate: number;
}

const props = defineProps<CardTotalProps>();

const icon = computed(
  () => props.rate > 10 ? "fa-arrow-trend-up text-warning" : "fa-sort-amount-down text-danger"
);
</script>

<style scoped>

</style>
