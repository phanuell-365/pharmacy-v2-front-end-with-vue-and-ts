<template>
  <section class="add-order">
    <SidebarLayout>
      <template #body>
        <AddOrder :medicine-id="medicineId" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddOrder from "@/components/app/orders/AddOrder.vue";

interface AddOrderViewProps {
  medicineId: string;
}

defineProps<AddOrderViewProps>();
</script>

<style scoped></style>
