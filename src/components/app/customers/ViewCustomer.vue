<template></template>

<script lang="ts" setup>
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useRouter } from "vue-router";

interface ViewCustomerProps {
  customerId: string;
}

const router = useRouter();

const props = defineProps<ViewCustomerProps>();

const customersStore = useCustomersStore();

const customer: Ref<CustomerDto | null> = ref(null);

try {
  customer.value = await customersStore.fetchCustomerById(props.customerId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "Customer not found!") {
    router.push(`/errors/customers/${props.customerId}`);
  }
}
</script>

<style scoped></style>
