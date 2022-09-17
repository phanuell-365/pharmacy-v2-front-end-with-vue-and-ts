<template>
  <div class="col-md-5 col-lg-4 order-md-last">
    <CheckoutHeading :number-of-items="medicineList.length" />
    <CheckoutList :list="medicineList" :total-price="total" @remove-item="onRemoveItemHandler" />
  </div>

</template>

<script lang="ts" setup>
import CheckoutHeading from "./CheckoutHeading.vue";
import CheckoutList from "./CheckoutList.vue";
import type { Ref } from "vue";
import { onBeforeUpdate, ref } from "vue";

interface CheckoutListItemProps {
  medicineName: string;
  medicinePrice: number;
}

interface CheckoutListProps {
  list: CheckoutListItemProps[];
}

const props = defineProps<CheckoutListProps>();

const medicineList: Ref<CheckoutListItemProps[]> = ref(props.list);

const prices = ref(medicineList.value.map(value => value.medicinePrice));

const total = ref(0);

prices.value.forEach(value => total.value += value);

const numberOfItems = ref(prices.value.length);

onBeforeUpdate(() => {
  prices.value = medicineList.value.map(value => value.medicinePrice);

  if (prices.value.length > numberOfItems.value) {
    prices.value.forEach(value => total.value += value);
  }
});

const onRemoveItemHandler = (medicine: CheckoutListItemProps) => {
  medicineList.value = medicineList.value?.filter(value => value.medicineName !== medicine.medicineName);
  total.value -= medicine.medicinePrice;
  // totalValue.value
};
</script>

<style scoped>

</style>
