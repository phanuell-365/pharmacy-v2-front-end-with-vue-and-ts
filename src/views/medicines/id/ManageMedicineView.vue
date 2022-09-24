<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        <ManageMedicine :medicine-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageMedicine from "@/components/app/medicines/ManageMedicine.vue";

interface ManageMedicineProps {
  id: string;
}

defineProps<ManageMedicineProps>();
</script>

<style scoped></style>
