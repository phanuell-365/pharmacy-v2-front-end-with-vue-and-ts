<template>
  <section class="view-expired-medicines">
    <SidebarLayout>
      <template #body>
        <MedicineCategory category="expired" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import MedicineCategory from "@/components/app/medicines/MedicineCategory.vue";
</script>
<style scoped></style>
