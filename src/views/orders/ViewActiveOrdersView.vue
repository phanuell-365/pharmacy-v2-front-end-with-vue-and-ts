<template>
  <section class="view-active-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="active" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewOrdersStatus from "@/components/app/orders/ViewOrdersStatus.vue";
</script>

<style scoped></style>
