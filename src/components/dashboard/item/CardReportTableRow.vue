<template>
  <tr>
    <td class="fs-5 text-secondary p-2 text-dark" colspan="2">{{ totalText }}</td>
    <td :class="textColor" class="fs-6">Kshs. {{ totalValue }}</td>
  </tr>
</template>

<script lang="ts" setup>
import {computed} from "vue";

interface CardReportTableRowProps {
  totalText: string;
  totalValue: number;
}

const props = defineProps<CardReportTableRowProps>()

const textColor = computed(
    () => props.totalValue <= 10 ? 'text-danger' : 'text-success'
)
</script>

<style scoped>

</style>
