<template>
  <section class="view-pending-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="pending" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadPendingOrderReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewOrdersStatus from "@/components/app/orders/ViewOrdersStatus.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useOrdersStore } from "@/stores/app/orders/orders";

const ordersStore = useOrdersStore();

const onDownloadPendingOrderReportClick = async () => {
  await ordersStore.generateOrdersReport("pending");
};
</script>

<style scoped></style>
