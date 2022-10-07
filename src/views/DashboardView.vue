<template>
  <SidebarLayout>
    <template #body>
      <DashboardLayout />
    </template>
  </SidebarLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
</script>
<style scoped></style>
