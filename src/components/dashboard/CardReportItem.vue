<template>
  <div class="container">
    <table class="table table-bordered table-striped table-hover">
      <CardReportTableRow v-for="total in totals" :key="total.totalText" :money="total.money"
                          :total-text="total.totalText" :total-value="total.totalValue" />
    </table>
  </div>

</template>

<script lang="ts" setup>
import CardReportTableRow from "@/components/dashboard/item/CardReportTableRow.vue";

interface CardReportTableRowProps {
  totalText: string;
  totalValue: number;
  money?: boolean;
}

interface CardReportItemProps {
  totals: CardReportTableRowProps[];
}

defineProps<CardReportItemProps>();
</script>

<style scoped>

</style>
