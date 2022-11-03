<template>
  <section class="manage-purchases">
    <SidebarLayout>
      <template #body>
        <ManagePurchases />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadPurchasesReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManagePurchases from "@/components/app/purchases/ManagePurchases.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { usePurchasesStore } from "@/stores/app/purchases/purchases";

const purchasesStore = usePurchasesStore();

const onDownloadPurchasesReportClick = async () => {
  await purchasesStore.generatePurchasesReport();
};
</script>

<style scoped></style>
