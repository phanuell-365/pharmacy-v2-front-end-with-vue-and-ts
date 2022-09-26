<template>
  <section class="view-issued-sales">
    <SidebarLayout>
      <template #body>
        <ViewSalesStatus status="issued" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewSalesStatus from "@/components/app/sales/ViewSalesStatus.vue";
</script>

<style scoped></style>
