<template>
  <section class="manage-customers">
    <SearchTable :attributes="customersStore.getCustomerAttributes" :records="customers" name="customer"
                 null-comment="Customer not found" search-by="name"
                 search-term="customer">
      <template #actions="{recordId}">
        <ButtonLinkIcon :href="`/customers/${recordId}`" action="view" />
        <ButtonLinkIcon :href="`/customers/${recordId}/update`" action="update" />
        <ButtonLinkIcon :href="`/customers/${recordId}`" action="delete" />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import moment from "moment";

const customersStore = useCustomersStore();

const customers: Ref<CustomerDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

try {
  customers.value = await customersStore.fetchCustomers();
} catch (error: any) {

  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Customers Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Customers Error",
    text: "Failed to fetch customers from the server",
    delay: 5000
  });

  toastError.value?.show();
}
</script>

<style scoped>

</style>
