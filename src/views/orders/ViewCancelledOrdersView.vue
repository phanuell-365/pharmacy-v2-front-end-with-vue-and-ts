<template>
  <section class="view-cancelled-orders">
    <SidebarLayout>
      <template #body>
        <ViewOrdersStatus status="cancelled" />
      </template>

      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Generate Report"
            @click="onGenerateCancelledOrderReportClick"
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

const onGenerateCancelledOrderReportClick = async () => {
  await ordersStore.generateOrdersReport("cancelled");
};
</script>

<style scoped></style>
