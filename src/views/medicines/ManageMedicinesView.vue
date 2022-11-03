<template>
  <section class="manage-medicines">
    <SidebarLayout>
      <template #body>
        <ManageMedicines manage="medicine" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadMedicinesReportClick"
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

const onDownloadMedicinesReportClick = async () => {
  await medicinesStore.generateMedicinesReport();
};
</script>

<style scoped></style>
