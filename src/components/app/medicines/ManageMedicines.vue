<template>
  <section class="manage-medicines">
    <SearchTable
      :attributes="attributes"
      :records="medicines"
      name="medicine"
      null-comment="Medicine not found"
      search-by="name"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon
          v-if="manage === 'medicine'"
          :href="`/medicines/${recordId}`"
          action="view"
        />
        <ButtonLinkIcon
          v-if="manage === 'stock'"
          :href="`/medicines/${recordId}?stock=true`"
          action="view"
        />
        <ButtonLinkIcon
          v-if="manage === 'medicine'"
          :href="`/medicines/${recordId}?update=true`"
          action="update"
        />
        <!--        <ButtonLinkIcon-->
        <!--          v-if="manage === 'stock'"-->
        <!--          :href="`/medicines/${recordId}?update=true&stock=true`"-->
        <!--          action="update"-->
        <!--        />-->
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
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
    <DeleteModal ref="deleteModalRef" name="delete-medicine">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteMedicine"
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
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { Ref } from "vue";
import { ref } from "vue";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import moment from "moment";
import { useRouter } from "vue-router";
import type { MedicineStockDto } from "@/stores/app/medicines/dto/medicine-stock.dto";

interface ManageMedicinesProps {
  manage: "stock" | "medicine";
}

const props = defineProps<ManageMedicinesProps>();

const router = useRouter();

const medicinesStore = useMedicinesStore();

const medicines: Ref<MedicineDto[] | MedicineStockDto[] | undefined> = ref();
const attributes: Ref<string[]> = ref([]);

const toastSuccess = ref();
const toastError = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

try {
  await medicinesStore.fetchMedicines();
  switch (props.manage) {
    case "medicine":
      medicines.value = medicinesStore.medicines;
      attributes.value = medicinesStore.getMedicineAttributes;
      break;
    case "stock":
      medicines.value = medicinesStore.medicineStock;
      attributes.value = medicinesStore.getMedicineStockAttributes;
      break;
  }
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Medicines Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Medicines Error",
    text: "Failed to fetch medicines from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const selectedMedicine: Ref<MedicineDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedMedicine.value = await medicinesStore.fetchMedicineById(recordId);

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this medicine?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Medicine Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Medicine Error",
      text: "Failed to fetch medicine from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const response: Ref<string | undefined> = ref();

const onDeleteMedicine = async () => {
  try {
    response.value = await medicinesStore.deleteMedicine(
      selectedMedicine.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Medicine Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Medicine Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    medicines.value = await medicinesStore.fetchMedicines();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Medicine Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Medicine Error",
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
