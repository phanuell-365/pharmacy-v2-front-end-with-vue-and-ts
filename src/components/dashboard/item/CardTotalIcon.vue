<template>
  <i :class="icon" class="fa-solid"></i>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface CardTotalProps {
  rate: number;
}

const props = defineProps<CardTotalProps>();

const icon = computed(() =>
  props.rate > 4 ? "fa-user text-warning" : "fa-user-tie text-danger"
);
// <i class="fa-solid fa-arrow-trend-up"></i>;
</script>

<style scoped></style>
