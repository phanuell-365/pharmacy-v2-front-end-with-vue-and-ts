<template>
  <section class="view-pending-sales">
    <SidebarLayout>
      <template #body>
        <ViewSalesStatus status="pending" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Pending Sales Report"
            @click="onDownloadPendingSalesReportClick"
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

const onDownloadPendingSalesReportClick = async () => {
  await salesStore.generateSalesReports("ungrouped", "pending");
};
</script>

<style scoped></style>
