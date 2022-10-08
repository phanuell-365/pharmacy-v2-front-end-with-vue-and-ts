<template>
  <section class="manage-purchase">
    <SidebarLayout>
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
import { ref, watch } from "vue";

interface ManagePurchaseProps {
  purchaseId: string;
  update: boolean;
}

const props = defineProps<ManagePurchaseProps>();

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
