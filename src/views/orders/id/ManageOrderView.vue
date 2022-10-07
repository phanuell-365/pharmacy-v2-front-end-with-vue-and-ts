<template>
  <section class="manage-user">
    <SidebarLayout>
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
import { ref, watch } from "vue";

interface ManageOrderProps {
  orderId: string;
  update: boolean;
}

const props = defineProps<ManageOrderProps>();

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
