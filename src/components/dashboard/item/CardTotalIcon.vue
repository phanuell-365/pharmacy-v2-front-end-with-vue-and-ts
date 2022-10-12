<template>
  <i :class="icon" class="fa-solid lead fs-4"></i>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface CardTotalProps {
  rate: number;
}

const props = defineProps<CardTotalProps>();

const icon = computed(() =>
  props.rate > 4
    ? "fa-user text-warning"
    : "fa-arrow-down-wide-short text-danger"
);
// <i class="fa-solid fa-arrow-trend-up"></i>;
</script>

<style scoped></style>
