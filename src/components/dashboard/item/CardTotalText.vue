<template>
  <p class="fs-6 fw-normal m-auto">
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface CardTotalTextProps {
  totalText?: string;
}

const props = defineProps<CardTotalTextProps>();

const text = computed(() =>
  props.totalText ? props.totalText : "Total Value"
);
</script>

<style scoped></style>
