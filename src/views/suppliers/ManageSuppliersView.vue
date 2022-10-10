<template>
  <section class="manage-suppliers">
    <SidebarLayout>
      <template #body>
        <ManageSuppliers />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Generate Report"
            @click="onGenerateSuppliersReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSuppliers from "@/components/app/suppliers/ManageSuppliers.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";

const suppliersStore = useSuppliersStore();

const onGenerateSuppliersReportClick = async () => {
  await suppliersStore.generateSuppliersReport();
};
</script>

<style scoped></style>
