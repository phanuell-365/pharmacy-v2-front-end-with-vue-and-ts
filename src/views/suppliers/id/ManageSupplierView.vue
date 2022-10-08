<template>
  <section class="manage-supplier">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ supplier?.name }}
        </span>
      </template>
      <template #body>
        <ManageSupplier :supplier-id="supplierId" :update-mode="updateMode" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSupplier from "@/components/app/suppliers/ManageSupplier.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import router from "@/router";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { SupplierDto } from "@/stores/app/suppliers/dto";

interface ManageSupplierViewProps {
  supplierId: string;
  update: boolean;
}

const props = defineProps<ManageSupplierViewProps>();

const suppliersStore = useSuppliersStore();

const supplier: Ref<SupplierDto | undefined> = ref();

onMounted(async () => {
  try {
    supplier.value = await suppliersStore.fetchSupplierById(props.supplierId);
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Supplier not found!") {
      await router.push(`/errors/suppliers/${props.supplierId}`);
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
