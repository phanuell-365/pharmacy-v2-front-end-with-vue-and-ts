<template>
  <tr>
    <td class="fs-5 text-secondary p-2 text-dark" colspan="2">
      {{ totalText }}
    </td>
    <td :class="textColor" class="fs-6">{{ valueText }}</td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface CardReportTableRowProps {
  totalText: string;
  totalValue: number;
  money?: boolean;
}

const props = defineProps<CardReportTableRowProps>();

const textColor = computed(() =>
  props.totalValue <= 10 ? "text-danger" : "text-success"
);

const formatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KSH",
});

const valueText = computed(() =>
  props.money ? formatter.format(props.totalValue) : `${props.totalValue}`
);
</script>

<style scoped></style>
