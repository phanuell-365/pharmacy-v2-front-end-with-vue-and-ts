<template>
  <div class="row">
    <DashboardActionsItem v-for="action in dashboardActions" :key="action.text" :href="action.href" :icon="action.icon"
                          :text="action.text" />
  </div>
</template>

<script lang="ts" setup>
import DashboardActionsItem from "@/components/dashboard/item/DashboardActionsItem.vue";

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
