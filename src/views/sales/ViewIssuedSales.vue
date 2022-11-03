<template>
  <section class="view-issued-sales">
    <SidebarLayout>
      <template #body>
        <ViewSalesStatus status="issued" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="View Issued Sales Report"
            @click="onViewIssuedSalesReportClick"
          />
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Issued Sales Report"
            @click="onDownloadIssuedSalesReportClick"
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

const onDownloadIssuedSalesReportClick = async () => {
  await salesStore.generateSalesReports("download", "ungrouped", "issued");
};

const onViewIssuedSalesReportClick = async () => {
  await salesStore.generateSalesReports("view", "ungrouped", "issued");
};
</script>

<style scoped></style>
