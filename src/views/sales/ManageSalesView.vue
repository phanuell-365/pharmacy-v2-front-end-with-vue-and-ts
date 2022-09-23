<template>
  <section class="manage-medicines">
    <SidebarLayout>
      <template #body>
        <ManageSales />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSales from "@/components/app/sales/ManageSales.vue";
</script>

<style scoped></style>
