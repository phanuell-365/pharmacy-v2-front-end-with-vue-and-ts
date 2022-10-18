<template>
  <div class="row">
    <template v-for="action in dashboardActions" :key="action.text">
      <template v-if="action.roles?.includes(loggedInUserRole)">
        <DashboardActionsItem
          :href="action.href"
          :icon="action.icon"
          :text="action.text"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import DashboardActionsItem from "@/components/dashboard/item/DashboardActionsItem.vue";
import type { Ref } from "vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

interface DashboardActionsItemProps {
  icon: string;
  href: string;
  text: string;
  roles?: string[];
}

interface DashboardActionsItemsProps {
  dashboardActions: DashboardActionsItemProps[];
}

defineProps<DashboardActionsItemsProps>();

const loggedInUserRole: Ref<string | undefined> = ref(authStore.getUserRole());
</script>

<style scoped></style>
