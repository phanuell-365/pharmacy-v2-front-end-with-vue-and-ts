<template>
  <section class="view-pending-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="pending" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewOrdersStatus from "@/components/app/orders/ViewOrdersStatus.vue";
</script>

<style scoped></style>
