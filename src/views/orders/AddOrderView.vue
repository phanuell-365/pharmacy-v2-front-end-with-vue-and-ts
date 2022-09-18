<template>
  <section class="add-order">
    <SidebarLayout>
      <template #body>
        <AddOrder />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddOrder from "@/components/app/orders/AddOrder.vue";</script>

<style scoped>

</style>
