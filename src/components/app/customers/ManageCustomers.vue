<template>
  <section class="manage-customers">
    <SearchTable
      :attributes="customersStore.getCustomerAttributes"
      :records="customers"
      :user-roles="userRoles"
      name="customer"
      null-comment="Customer not found"
      search-by="name"
      search-term="customer"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon
          :href="`/customers/${recordId}`"
          action="view"
          data-bs-html="true"
          data-bs-placement="top"
          data-bs-toggle="tooltip"
          title="View Customer"
        />
        <ButtonLinkIcon
          :href="`/customers/${recordId}?update=true`"
          action="update"
        />
        <ButtonIcon
          :icon-name="DELETE_ICON"
          class="mx-1"
          skin="danger"
          @click="onDeleteClick(recordId)"
        />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
        <LiveToast
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
      </ToastContainer>
    </Teleport>
    <DeleteModal ref="deleteModalRef" name="delete-customer">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteCustomer"
        >
          <strong>Yes</strong>
        </button>
        <button
          class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
          data-bs-dismiss="modal"
          type="button"
        >
          Cancel
        </button>
      </template>
    </DeleteModal>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { DELETE_ICON } from "@/constants/icons";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { CustomerDto } from "@/stores/app/customers/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const customersStore = useCustomersStore();

const userRoles: Ref<string[]> = ref([
  "admin",
  "chiefPharmacist",
  "pharmacistAssistant",
  "pharmacyTechnician",
]);

const customers: Ref<CustomerDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

try {
  customers.value = await customersStore.fetchCustomers();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Customers Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Customers Error",
    text: "Failed to fetch customers from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const selectedCustomer: Ref<CustomerDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedCustomer.value = await customersStore.fetchCustomerById(recordId);

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this customer ?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Customer Error",
      text: "Failed to fetch customer from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const response: Ref<string | undefined> = ref();

const onDeleteCustomer = async () => {
  try {
    response.value = await customersStore.deleteCustomer(
      selectedCustomer.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Customer Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Customer Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    customers.value = await customersStore.fetchCustomers();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Customer Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Customer Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onHiddenBsToast = () => {
  router.go(0);
};
</script>

<style scoped></style>
