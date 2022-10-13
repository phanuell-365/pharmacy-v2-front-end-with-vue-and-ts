<template>
  <section class="manage-suppliers">
    <SearchTable
      :attributes="suppliersStore.getSupplierAttributes"
      :records="suppliers"
      name="supplier"
      null-comment="Supplier not found"
      search-by="name"
      search-term="supplier"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/suppliers/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/suppliers/${recordId}?update=true`"
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
        <LiveToast
          ref="toastSuccess"
          skin="info"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastError" skin="danger" />
        <LiveToast
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
      </ToastContainer>
    </Teleport>
    <DeleteModal ref="deleteModalRef" name="delete-supplier">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteSupplier"
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
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const suppliersStore = useSuppliersStore();

const suppliers: Ref<SupplierDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

try {
  suppliers.value = await suppliersStore.fetchSuppliers();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Suppliers Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Suppliers Error",
    text: "Failed to fetch suppliers from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const selectedSupplier: Ref<SupplierDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedSupplier.value = await suppliersStore.fetchSupplierById(recordId);

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this supplier ?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Supplier Error",
      text: "Failed to fetch supplier from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const response: Ref<string | undefined> = ref();

const onDeleteSupplier = async () => {
  try {
    response.value = await suppliersStore.deleteSupplier(
      selectedSupplier.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Supplier Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Supplier Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    suppliers.value = await suppliersStore.fetchSuppliers();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Supplier Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Supplier Error",
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
