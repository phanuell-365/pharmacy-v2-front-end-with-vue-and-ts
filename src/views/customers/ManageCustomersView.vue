<template>
  <section class="manage-customers">
    <SidebarLayout>
      <template #body>
        <ManageCustomers />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadCustomersReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageCustomers from "@/components/app/customers/ManageCustomers.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useCustomersStore } from "@/stores/app/customers/customers";

const customersStore = useCustomersStore();

const onDownloadCustomersReportClick = async () => {
  await customersStore.generateCustomersReport();
};
</script>

<style scoped></style>
