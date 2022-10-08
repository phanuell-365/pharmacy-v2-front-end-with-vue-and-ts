<template>
  <section class="manage-medicine">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ medicine?.name }}
        </span>
      </template>
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
import { onMounted, ref, watch } from "vue";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useRouter } from "vue-router";

interface ManageMedicineProps {
  medicineId: string;
  update: boolean;
}

const router = useRouter();

const props = defineProps<ManageMedicineProps>();

const medicinesStore = useMedicinesStore();

const medicine: Ref<MedicineDto | undefined> = ref();

onMounted(async () => {
  try {
    medicine.value = await medicinesStore.fetchMedicineById(props.medicineId);
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Medicine not found!") {
      await router.push(`/errors/medicines/${props.medicineId}`);
    }
  }
});

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
