<template>
  <section class="manage-stocks">
    <SidebarLayout>
      <template #body>
        <ManageOrders />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageOrders from "@/components/app/orders/ManageOrders.vue";</script>

<style scoped>

</style>
