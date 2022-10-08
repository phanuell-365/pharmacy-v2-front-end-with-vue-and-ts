<template>
  <section class="manage-purchases">
    <SearchTable
      :attributes="purchasesStore.getPurchaseAttributes"
      :records="purchases"
      name="purchases"
      null-comment="Purchase not found"
      search-by="medicine"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/purchases/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/purchases/${recordId}?update=true`"
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
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
    <DeleteModal ref="deleteModalRef" name="delete-purchase">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeletePurchase"
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
import { usePurchasesStore } from "@/stores/app/purchases/purchases";
import type { Ref } from "vue";
import { ref } from "vue";
import type { PurchaseDto } from "@/stores/app/purchases/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const purchasesStore = usePurchasesStore();

const purchases: Ref<PurchaseDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

try {
  purchases.value = await purchasesStore.fetchPurchases();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Purchases Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Purchases Error",
    text: "Failed to fetch purchases from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const response: Ref<string | undefined> = ref();

const selectedPurchase: Ref<PurchaseDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedPurchase.value = (await purchasesStore.fetchPurchaseById(
      recordId
    )) as PurchaseDto;

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this purchase?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Purchase Error",
      text: "Failed to fetch purchase from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onDeletePurchase = async () => {
  try {
    response.value = await purchasesStore.deletePurchase(
      selectedPurchase.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Purchase Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Purchase Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    purchases.value = await purchasesStore.fetchPurchases();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Purchase Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Purchase Error",
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
