<template>
  <section class="manage-customers">
    <SidebarLayout>
      <template #body>
        <ManageCustomers />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageCustomers from "@/components/app/customers/ManageCustomers.vue";</script>

<style scoped>

</style>
