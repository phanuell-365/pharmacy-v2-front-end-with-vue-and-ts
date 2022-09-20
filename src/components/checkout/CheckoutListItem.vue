<template>
  <li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
      <h6 class="my-0">{{ productName }}</h6>
      <!--      <small class="text-muted">Click to remove item</small>-->
      <span class="text-muted">Kshs. <span class="text-success">{{ productPrice }}</span></span>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-wrap flex-column">
      <h6 class="my-0">Quantity</h6>
      <span class="text-muted"><span class="text-primary">{{ productQuantity }}</span></span>
    </div>
    <FormButtonsContainer>
      <ButtonIcon :icon-name="EDIT_ICON" class="m-1" outline skin="secondary"
                  @click="onUpdateClickHandler({productName, productQuantity, productPrice})" />
      <ButtonIcon :icon-name="DELETE_ICON" class="m-1" outline skin="danger"
                  @click="onRemoveClickHandler(productName)" />
    </FormButtonsContainer>
  </li>
</template>

<script lang="ts" setup>
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import { DELETE_ICON, EDIT_ICON } from "@/constants/icons";

interface CheckoutListItemProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
}

defineProps<CheckoutListItemProps>();

const emit = defineEmits<{ (e: "remove-item-click", itemName: CheckoutListItemProps["productName"]): void, (e: "update-item-click", item: CheckoutListItemProps): void }>();

const onRemoveClickHandler = (productName: string) => {
  emit("remove-item-click", productName);
};

const onUpdateClickHandler = (product: CheckoutListItemProps) => {
  emit("update-item-click", product);
};
</script>

<style scoped>

</style>
