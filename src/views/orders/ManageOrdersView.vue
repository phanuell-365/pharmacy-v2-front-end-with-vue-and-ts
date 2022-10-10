<template>
  <section class="manage-stocks">
    <SidebarLayout>
      <template #body>
        <ManageOrders />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Generate Report"
            @click="onGenerateOrderReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageOrders from "@/components/app/orders/ManageOrders.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useOrdersStore } from "@/stores/app/orders/orders";

const ordersStore = useOrdersStore();

const onGenerateOrderReportClick = () => {
  ordersStore.generateOrdersReport();
};
</script>

<style scoped></style>
