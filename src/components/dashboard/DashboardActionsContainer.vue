<template>
  <div class="container">
    <DashboardActionsRow :dashboard-actions="dashboardActions" />
  </div>
</template>

<script lang="ts" setup>
import DashboardActionsRow from "@/components/dashboard/item/DashboardActionsRow.vue";

interface DashboardActionsItemProps {
  icon: string;
  href: string;
  text: string;
}

interface DashboardActionsItemsProps {
  dashboardActions: DashboardActionsItemProps[];
}

defineProps<DashboardActionsItemsProps>();
</script>

<style scoped>

</style>
