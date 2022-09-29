<template>
  <section class="view-cancelled-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="cancelled" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewOrdersStatus from "@/components/app/orders/ViewOrdersStatus.vue";
</script>

<style scoped></style>
