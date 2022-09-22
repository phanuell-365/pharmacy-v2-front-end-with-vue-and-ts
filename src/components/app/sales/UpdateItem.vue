<template>
  <ActionModal ref="updateCustomerOrderModal">
    <template #modal-body>
      <div class="row">
        <p class="fs-5 fw-normal">Please enter the new issue unit quantity</p>
        <div class="row mb-3">
          <label
            class="col-sm-2 col-form-label fs-6 fw-semibold"
            for="colFormLabel"
            >Quantity</label
          >
          <div class="col-sm-10 m-auto">
            <input
              id="validationUpdateIssueUnitQuantity"
              ref="newIssueUnitQuantityRef"
              v-model="newIssueUnitQuantity"
              :class="{
                'is-invalid':
                  !newIssueUnitQuantityMeta.valid &&
                  newIssueUnitQuantityMeta.validated,
              }"
              autocomplete="off"
              class="form-control"
              name="issueUnitQuantity"
              required
              type="text"
            />
            <div class="invalid-feedback">
              {{ newIssueUnitQuantityErrorMessage }}
            </div>
            <!--                  <input id="newIssueQuantity" class="form-control m-auto" name="newIssueQuantity" type="text">-->
          </div>
        </div>
      </div>
    </template>
    <template #modal-buttons>
      <FormButton
        skin="secondary"
        text="Update"
        @click="onUpdateCustomerOrderClick"
      />
      <FormButton skin="danger" text="Cancel" @click="onCancelClick" />
    </template>
  </ActionModal>
</template>

<script lang="ts" setup>
import ActionModal from "@/components/modal/ActionModal.vue";
import FormButton from "@/components/button/FormButton.vue";
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import {
  CustomersOrders,
  useCustomersOrdersStore,
} from "@/stores/app/sales/customers-orders";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";

const customersOrdersStore = useCustomersOrdersStore();

const updateCustomerOrderModal = ref<InstanceType<ActionModal> | null>(null);
const newIssueUnitQuantityRef: Ref<HTMLInputElement | null | undefined> = ref();

onMounted(() => {
  updateCustomerOrderModal.value?.setUpModal({
    title: "Update Medicine Quantity!",
  });
  updateCustomerOrderModal.value?.setFocus(newIssueUnitQuantityRef.value);
});

const medicineOrderId: Ref<string> = ref("");

const medicineOrderToUpdate: Ref<CustomersOrders | null | undefined> = ref();

watch(medicineOrderId, (value) => {
  medicineOrderToUpdate.value = customersOrdersStore.items.find(
    (value1) => value1.id === value
  );
  newIssueUnitQuantity.value =
    medicineOrderToUpdate.value?.quantity.toString() as string;
});

defineExpose({
  setMedicineOrderId: (medOrderId: string) =>
    (medicineOrderId.value = medOrderId),
  showModal: () => updateCustomerOrderModal.value?.showModal(),
  hideModal: () => updateCustomerOrderModal.value?.hideModal(),
});

const newIssueUnitQuantityValidation = (value: string) => {
  if (!value) return "This is a required field";

  if (!useIsNumeric(value).value)
    return "The issue unit quantity should be a number";

  if (+value <= 0) {
    return "The issue unit quantity not be less than or equal to 0";
  }

  return true;
};

const {
  value: newIssueUnitQuantity,
  errorMessage: newIssueUnitQuantityErrorMessage,
  meta: newIssueUnitQuantityMeta,
} = useField("newIssueUnitQuantity", newIssueUnitQuantityValidation);

const onUpdateCustomerOrderClick = () => {
  if (newIssueUnitQuantityMeta.valid) {
    customersOrdersStore.updateItemQuantity({
      id: medicineOrderId.value,
      quantity: +newIssueUnitQuantity.value,
    });

    updateCustomerOrderModal.value?.hideModal();
  }
  updateCustomerOrderModal.value?.hideModal();
};

const onCancelClick = () => {
  updateCustomerOrderModal.value?.hideModal();
};
</script>

<style scoped></style>
