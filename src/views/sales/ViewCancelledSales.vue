<template>
  <section class="view-cancelled-sales">
    <SidebarLayout>
      <template #body>
        <ViewSalesStatus status="cancelled" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewSalesStatus from "@/components/app/sales/ViewSalesStatus.vue";
</script>

<style scoped></style>
