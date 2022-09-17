<template>
  <div class="scroll-list">
    <TransitionGroup class="list-group mb-3" name="medicine-list" tag="ul">
      <CheckoutListItem v-for="item in list" :key="item.medicineName" :product-name="item.medicineName"
                        :product-price="item.medicinePrice"
                        @click="onRemoveItemClick(item)" />
    </TransitionGroup>
    <div class="card p-1 px-2 sticky-bottom">
      <span>Total (KSHS)</span>
      <strong>Kshs. {{ totalPrice }}</strong>
    </div>
  </div>

</template>

<script lang="ts" setup>
import CheckoutListItem from "./CheckoutListItem.vue";

interface CheckoutListItemProps {
  medicineName: string;
  medicinePrice: number;
}

interface CheckoutListProps {
  list: CheckoutListItemProps[];
  totalPrice: number;
}

defineProps<CheckoutListProps>();

const emit = defineEmits<{ (e: "removeItem", medicine: CheckoutListItemProps): void }>();

const onRemoveItemClick = (medicine: CheckoutListItemProps) => {
  console.log(`Deleting => ${medicine.medicineName}`);
  emit("removeItem", medicine);
};
</script>

<style scoped>
.scroll-list {
  position: relative;
  height: 280px;
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
</style>
