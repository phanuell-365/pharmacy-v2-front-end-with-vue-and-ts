<template>
  <section class="manage-orders">
    <SearchTable
      :attributes="ordersStore.getOrderAttributes"
      :records="orders"
      name="order"
      null-comment="Order not found"
      search-by="medicine"
      search-term="medicine"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/orders/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/orders/${recordId}?update=true`"
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
    <DeleteModal ref="deleteModalRef" name="delete-order">
      <template #buttons>
        <button
          class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          data-bs-dismiss="modal"
          type="button"
          @click="onDeleteOrder"
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
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { Ref } from "vue";
import { ref } from "vue";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const ordersStore = useOrdersStore();

const orders: Ref<OrderDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

try {
  orders.value = await ordersStore.fetchOrders();
} catch (error: any) {
  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Orders Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Orders Error",
    text: "Failed to fetch orders from the server",
    delay: 5000,
  });

  toastError.value?.show();
}

const response: Ref<string | undefined> = ref();

const selectedOrder: Ref<OrderDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedOrder.value = (await ordersStore.fetchOrderById(
      recordId,
      false
    )) as OrderDto;

    deleteModalRef.value.setUpModal({
      secondaryHeader: "Are you sure you want to delete this order?",
      primaryHeader: "Click yes to delete and cancel to exit.",
    });

    deleteModalRef.value.showModal();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Order Error",
      text: "Failed to fetch order from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onDeleteOrder = async () => {
  try {
    response.value = await ordersStore.deleteOrder(
      selectedOrder.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete Order Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Order Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    orders.value = await ordersStore.fetchOrders();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete Order Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Order Error",
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
