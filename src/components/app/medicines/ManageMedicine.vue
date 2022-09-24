<template></template>

<script lang="ts" setup>
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { Ref } from "vue";
import { ref } from "vue";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useRouter } from "vue-router";

interface ManageMedicineProps {
  medicineId: string;
}

const router = useRouter();

const props = defineProps<ManageMedicineProps>();

const medicinesStore = useMedicinesStore();

const medicine: Ref<MedicineDto | null> = ref(null);

try {
  medicine.value = await medicinesStore.fetchMedicineById(props.medicineId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "Medicine not found!") {
    router.push(`/errors/medicines/${props.medicineId}`);
  }
}
</script>

<style scoped></style>
