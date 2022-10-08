<template>
  <section class="manage-purchase">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage Purchase For {{ medicine?.name }}
        </span>
      </template>
      <template #body>
        <ManagePurchase :purchase-id="purchaseId" :update-mode="updateMode" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManagePurchase from "@/components/app/purchases/ManagePurchase.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import router from "@/router";
import type { PurchaseDto } from "@/stores/app/purchases/dto";
import { usePurchasesStore } from "@/stores/app/purchases/purchases";
import type { OrderDtoWithId } from "@/stores/app/orders/dto/order.dto";
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";

interface ManagePurchaseProps {
  purchaseId: string;
  update: boolean;
}

const props = defineProps<ManagePurchaseProps>();

const purchasesStore = usePurchasesStore();
const ordersStore = useOrdersStore();
const medicineStore = useMedicinesStore();

const purchase: Ref<PurchaseDto | undefined> = ref();
const order: Ref<OrderDtoWithId | undefined> = ref();
const medicine: Ref<MedicineDto | undefined> = ref();

onMounted(async () => {
  try {
    purchase.value = await purchasesStore.fetchPurchaseById(props.purchaseId);
    if (purchase.value?.OrderId)
      order.value = (await ordersStore.fetchOrderById(
        purchase.value?.OrderId,
        true
      )) as OrderDtoWithId;
    if (order.value?.MedicineId)
      medicine.value = await medicineStore.fetchMedicineById(
        order.value?.MedicineId
      );
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Purchase not found!") {
      await router.push(`/errors/purchases/${props.purchaseId}`);
    }

    if (error.message === "Order not found!") {
      await router.push(`/errors/orders/${purchase.value?.OrderId}`);
    }

    if (error.message === "Medicine not found!") {
      await router.push(`/errors/medicines/${order.value?.MedicineId}`);
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
