<template>
  <section class="add-medicine">
    <SidebarLayout>
      <template #body>
        <AddMedicine />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddMedicine from "@/components/app/medicines/AddMedicine.vue";</script>

<style scoped>

</style>
