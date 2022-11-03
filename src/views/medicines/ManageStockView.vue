<template>
  <section class="manage-medicines">
    <SidebarLayout>
      <template #body>
        <ManageMedicines manage="stock" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadMedicinesStockReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageMedicines from "@/components/app/medicines/ManageMedicines.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";

const medicinesStore = useMedicinesStore();

const onDownloadMedicinesStockReportClick = async () => {
  await medicinesStore.generateMedicinesStockReport();
};
</script>

<style scoped></style>
