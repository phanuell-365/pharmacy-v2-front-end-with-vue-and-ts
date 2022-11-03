<template>
  <section class="monthly-sales-view">
    <SidebarLayout>
      <template #body>
        <MonthlySales />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="View Monthly Sales Report"
            @click="onViewMonthlySalesReportClick"
          />
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Monthly Sales Report"
            @click="onDownloadMonthlySalesReportClick"
          />
        </FormButtonsContainer>
      </template>
      <Teleport>
        <ToastContainer :placement="TOP_CENTER">
          <LiveToast ref="toastError" skin="danger" />
        </ToastContainer>
      </Teleport>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import MonthlySales from "@/components/app/sales/MonthlySales.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { TOP_CENTER } from "@/constants/toasts";
</script>

<style scoped></style>
