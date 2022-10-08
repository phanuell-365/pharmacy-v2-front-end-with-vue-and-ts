<template>
  <section class="manage-sale">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage Sale For {{ medicine?.name }}
        </span>
      </template>
      <template #body>
        <ManageSale :sale-id="saleId" :update-mode="updateMode" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSale from "@/components/app/sales/ManageSale.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import router from "@/router";
import type { SalesWithIdsDto } from "@/stores/app/sales/dto";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";

interface ManageSaleProps {
  saleId: string;
  update: boolean;
}

const props = defineProps<ManageSaleProps>();

const salesStore = useSalesStore();
const customersStore = useCustomersStore();
const medicineStore = useMedicinesStore();

const sale: Ref<SalesWithIdsDto | undefined> = ref();
const customer: Ref<CustomerDto | undefined> = ref();
const medicine: Ref<MedicineDto | undefined> = ref();

onMounted(async () => {
  try {
    sale.value = (await salesStore.fetchSaleById(
      props.saleId,
      true
    )) as SalesWithIdsDto;
    if (sale.value?.CustomerId)
      customer.value = await customersStore.fetchCustomerById(
        sale.value?.CustomerId
      );
    if (sale.value?.MedicineId)
      medicine.value = await medicineStore.fetchMedicineById(
        sale.value?.MedicineId
      );
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Sale not found!") {
      await router.push(`/errors/sales/${props.saleId}`);
    }

    if (error.message === "Customer not found!") {
      await router.push(`/errors/customers/${sale.value?.CustomerId}`);
    }

    if (error.message === "Medicine not found!") {
      await router.push(`/errors/medicines/${sale.value?.MedicineId}`);
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
