<template>
  <section class="manage-sales-view">
    <SidebarLayout>
      <template #body>
        <ManageSales />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download All Sales Report"
            @click="onDownloadReportClick('ungrouped')"
          />
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Sales Report"
            @click="onDownloadReportClick('grouped')"
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
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSales from "@/components/app/sales/ManageSales.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import moment from "moment";

const salesStore = useSalesStore();

const toastError: Ref<InstanceType<LiveToast>> = ref();

const onDownloadReportClick = async (category: "ungrouped" | "grouped") => {
  try {
    await salesStore.generateSalesReports("download", category);
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Sales Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Sales Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();

    console.error(error);
  }
};
</script>

<style scoped></style>
