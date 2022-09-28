<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        <ManageMedicine :medicine-id="medicineId" :update-mode="updateMode" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageMedicine from "@/components/app/medicines/ManageMedicine.vue";
import type { Ref } from "vue";
import { ref, watch } from "vue";

interface ManageMedicineProps {
  medicineId: string;
  update: boolean;
}

const props = defineProps<ManageMedicineProps>();

const updateMode: Ref<boolean> = ref(props.update);

watch(
  () => props.update,
  (value) => {
    console.log(value);
    updateMode.value = value;
  }
);
</script>

<style scoped></style>
