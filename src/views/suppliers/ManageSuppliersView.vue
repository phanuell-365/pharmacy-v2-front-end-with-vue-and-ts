<template>
  <section class="manage-suppliers">
    <SidebarLayout>
      <template #body>
        <ManageSuppliers />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSuppliers from "@/components/app/suppliers/ManageSuppliers.vue";</script>

<style scoped>

</style>
