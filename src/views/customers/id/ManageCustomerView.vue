<template>
  <section class="manage-customer">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ customer?.name }}
        </span>
      </template>
      <template #body>
        <ManageCustomer :customer-id="customerId" :update-mode="update" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageCustomer from "@/components/app/customers/ManageCustomer.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import { useCustomersStore } from "@/stores/app/customers/customers";
import router from "@/router";
import type { CustomerDto } from "@/stores/app/customers/dto";

interface ManageCustomerViewProps {
  customerId: string;
  update: boolean;
}

const props = defineProps<ManageCustomerViewProps>();

const customersStore = useCustomersStore();

const customer: Ref<CustomerDto | undefined> = ref();

onMounted(async () => {
  try {
    customer.value = await customersStore.fetchCustomerById(props.customerId);
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "Customer not found!") {
      await router.push(`/errors/customers/${props.customerId}`);
    }
  }
});

const updateMode: Ref<boolean> = ref(props.update);

watch(
  () => props.update,
  (value) => {
    console.log(value);
    updateMode.value = value;
  }
);
</script>

<style scoped></style>
