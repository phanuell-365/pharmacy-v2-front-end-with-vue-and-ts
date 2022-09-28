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
        <ButtonLinkIcon :href="`/suppliers/${recordId}`" action="delete" />
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
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { Ref } from "vue";
import { ref } from "vue";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import moment from "moment";

const suppliersStore = useSuppliersStore();

const suppliers: Ref<SupplierDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

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
</script>

<style scoped></style>
