<template>
  <section class="view-expired-medicines">
    <SidebarLayout>
      <template #body>
        <MedicineCategory category="expired" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadExpiredMedicineReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import MedicineCategory from "@/components/app/medicines/MedicineCategory.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";

const medicinesStore = useMedicinesStore();

const onDownloadExpiredMedicineReportClick = async () => {
  await medicinesStore.generateExpiredStockReport();
};
</script>
<style scoped></style>
