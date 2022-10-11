<template>
  <div class="col-md-3 col-lg-4 order-md-last mb-2">
    <CheckoutHeading :customer-name="customerName" />
    <CheckoutList @update-item="onUpdateItemHandler" />
  </div>
</template>

<script lang="ts" setup>
import CheckoutHeading from "./CheckoutHeading.vue";
import CheckoutList from "./CheckoutList.vue";

interface CheckoutListProps {
  customerName?: string;
}

const props = defineProps<CheckoutListProps>();

interface MedicineQuantityUpdate {
  productName: string;
  productPrice: number;
  productQuantity: number;
}

const emit = defineEmits<{ (e: "update-item", medicine: MedicineQuantityUpdate): void }>();

const onUpdateItemHandler = (medicine: MedicineQuantityUpdate) => {
  emit("update-item", medicine);
};
</script>

<style scoped>

</style>
