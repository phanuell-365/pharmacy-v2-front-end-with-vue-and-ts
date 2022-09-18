<template>
  <section class="add-customer">
    <SidebarLayout>
      <template #body>
        <AddCustomer />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddCustomer from "@/components/app/customers/AddCustomer.vue";</script>

<style scoped>

</style>
