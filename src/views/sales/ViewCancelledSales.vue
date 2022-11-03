<template>
  <section class="view-cancelled-sales">
    <SidebarLayout>
      <template #body>
        <ViewSalesStatus status="cancelled" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Cancelled Sales Report"
            @click="onDownloadCancelledSalesReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewSalesStatus from "@/components/app/sales/ViewSalesStatus.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useSalesStore } from "@/stores/app/sales/sales";

const salesStore = useSalesStore();

const onDownloadCancelledSalesReportClick = async () => {
  await salesStore.generateSalesReports("ungrouped", "cancelled");
};
</script>

<style scoped></style>
