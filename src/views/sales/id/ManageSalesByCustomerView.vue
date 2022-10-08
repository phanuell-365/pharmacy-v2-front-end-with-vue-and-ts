<template>
  <section class="manage-sale">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ customer?.name }}'s sales
        </span>
      </template>
      <template #body>
        <ManageSalesByCustomer :customer-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageSalesByCustomer from "@/components/app/sales/ManageSalesByCustomer.vue";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useRouter } from "vue-router";

const router = useRouter();

interface ManageSalesByCustomerViewProps {
  id: string;
}

const props = defineProps<ManageSalesByCustomerViewProps>();

const customersStore = useCustomersStore();

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
</script>

<style scoped></style>
