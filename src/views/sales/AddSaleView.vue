<template>
  <section class="add-sale">
    <SidebarLayout>
      <template #body>
        <AddSales />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddSales from "@/components/app/sales/AddSales.vue";</script>

<style scoped>

</style>
