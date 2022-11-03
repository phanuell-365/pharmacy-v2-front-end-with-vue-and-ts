<template>
  <section class="manage-sale">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ customer?.name }}'s sales
        </span>
      </template>
      <template #body>
        <ManageSalesByCustomer :customer-id="id" :sale-date="saleDate" />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="View Sales Receipt"
            @click="onViewSalesReceipt"
          />
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Sales Receipt"
            @click="onDownloadSalesReceipt"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSalesByCustomer from "@/components/app/sales/ManageSalesByCustomer.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useRouter } from "vue-router";
import { useSalesStore } from "@/stores/app/sales/sales";

const router = useRouter();

interface ManageSalesByCustomerViewProps {
  id: string;
  saleDate: string;
}

const props = defineProps<ManageSalesByCustomerViewProps>();

const customersStore = useCustomersStore();
const salesStore = useSalesStore();

const customer: Ref<CustomerDto | null> = ref(null);

onMounted(async () => {
  try {
    customer.value = await customersStore.fetchCustomerById(props.id);
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Customer not found!") {
      await router.push(`/errors/customers/${props.id}`);
    }
  }
});

const onViewSalesReceipt = async () => {
  await salesStore.generateSalesReceipt(props.id, props.saleDate, "view");
};

const onDownloadSalesReceipt = async () => {
  await salesStore.generateSalesReceipt(props.id, props.saleDate, "download");
};
</script>

<style scoped></style>
