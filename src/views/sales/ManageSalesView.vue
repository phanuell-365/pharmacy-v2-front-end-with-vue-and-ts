<template>
  <section class="manage-suppliers">
    <SidebarLayout>
      <template #body>
        <ManageSales />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Generate All Sales Report"
            @click="onGenerateReportClick('ungrouped')"
          />
          <FormButton
            class="my-1"
            skin="dark"
            text="Generate Sales Report"
            @click="onGenerateReportClick('grouped')"
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

const onGenerateReportClick = async (category: string) => {
  try {
    await salesStore.generateSalesReports(category);
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Users Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Users Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();

    console.error(error);
  }
};
</script>

<style scoped></style>
