<template>
  <div class="scroll-list">
    <TransitionGroup class="list-group mb-3" name="medicine-list" tag="ul">
      <CheckoutListItem v-for="item in customersOrdersStore.items" :key="item.medicineName"
                        :product-name="item.medicineName"
                        :product-price="item.medicinePrice"
                        :product-quantity="item.medicineQuantity"
                        @update-item-click="onUpdateItemClick"
                        @remove-item-click="onRemoveItemClick(item.medicineName)" />
    </TransitionGroup>
    <div class="card p-1 px-2 sticky-bottom">
      <span>Total (KSHS)</span>
      <strong>Kshs. {{ customersOrdersStore.getTotalCost }}</strong>
    </div>
  </div>

</template>

<script lang="ts" setup>
import CheckoutListItem from "./CheckoutListItem.vue";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";

const customersOrdersStore = useCustomersOrdersStore();

const onRemoveItemClick = (medicineName: string) => {
  customersOrdersStore.removeItem(medicineName);
};

interface MedicineQuantityUpdate {
  productName: string;
  productPrice: number;
  productQuantity: number;
}

const emit = defineEmits<{(e: "update-item", medicine: MedicineQuantityUpdate): void }>();

const onUpdateItemClick = (medicine: MedicineQuantityUpdate) => {
  emit("update-item", medicine);
};
</script>

<style scoped>
.scroll-list {
  position: relative;
  max-height: 250px;
  overflow: auto;
}

.medicine-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.medicine-list-enter-active {
  transition: all 1s ease-out;
}

.medicine-list-enter-to,
.medicine-list-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.medicine-list-leave-active {
  transition: all 1s ease-in;
}

.medicine-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.medicine-list-move {
  transition: transform 0.8ms ease;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /*box-shadow: inset 0 0 5px gray;*/
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: dimgray;
}
</style>
