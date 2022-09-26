<template>
  <section class="view-medicines-out-of-stock">
    <SidebarLayout>
      <template #body>
        <MedicineCategory category="out-of-stock" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import MedicineCategory from "@/components/app/medicines/MedicineCategory.vue";
</script>

<style scoped></style>
