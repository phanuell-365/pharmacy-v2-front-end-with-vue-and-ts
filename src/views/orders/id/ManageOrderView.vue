<template>
  <section class="manage-order">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage Order For {{ medicine?.name }}
        </span>
      </template>
      <template #body>
        <ManageOrder :order-id="orderId" :update-mode="updateMode" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageOrder from "@/components/app/orders/ManageOrder.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useOrdersStore } from "@/stores/app/orders/orders";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { OrderDtoWithId } from "@/stores/app/orders/dto/order.dto";
import type { MedicineDto } from "@/stores/app/medicines/dto";

const router = useRouter();

interface ManageOrderProps {
  orderId: string;
  update: boolean;
}

const props = defineProps<ManageOrderProps>();

const ordersStore = useOrdersStore();
const medicineStore = useMedicinesStore();

const order: Ref<OrderDtoWithId | undefined> = ref();
const medicine: Ref<MedicineDto | undefined> = ref();

onMounted(async () => {
  try {
    order.value = (await ordersStore.fetchOrderById(
      props.orderId,
      true
    )) as OrderDtoWithId;
    if (order.value?.MedicineId)
      medicine.value = await medicineStore.fetchMedicineById(
        order.value?.MedicineId
      );
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Order not found!") {
      await router.push(`/errors/orders/${props.orderId}`);
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
