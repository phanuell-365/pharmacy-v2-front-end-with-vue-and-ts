<template>
  <section class="view-delivered-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="delivered" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewOrdersStatus from "@/components/app/orders/ViewOrdersStatus.vue";
</script>

<style scoped></style>
