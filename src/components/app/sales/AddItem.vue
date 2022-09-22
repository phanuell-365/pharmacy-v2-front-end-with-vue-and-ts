<template>
  <div
    ref="addItemModalRef" aria-hidden="true" aria-labelledby="staticBackdropLabel"
    class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <div id="staticBackdropLabel" class="modal-header p-2 border-bottom-0">
            <FontAwesome :icon-name="OK_ICON" class="mx-3 fa-2x text-info" />
            <p class="fs-5 mb-0 text-dark">Add Medicine</p>
          </div>
          <button aria-label="Close" class="btn-close text-end mx-2"
                  data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body border-bottom-0">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-10 col-sm-10">
                <div class="m-auto">
                  <SearchPanel :filter-array="medicineSearchPairs" label="medicine" name="medicine"
                               @on-found-item="onFoundItemHandler" />
                </div>
              </div>
              <div class="col-md-10 col-sm-10">
                <div class="m-auto">
                  <InputContainer :invalid-feedback="issueUnitQuantityErrorMessage" input-id="issueUnitQuantity"
                                  input-label="issueUnitQuantity">
                    <input id="validationIssueUnitQuantity" ref="issueUnitQuantityRef" v-model="issueUnitQuantity"
                           :class="{'is-invalid': !issueUnitQuantityMeta.valid && issueUnitQuantityMeta.validated}"
                           class="form-control" name="issueUnitQuantity" required type="text">
                  </InputContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-top-0">
          <FormButton skin="primary" text="Add" @click="onAddClickHandler" />
          <FormButton skin="danger" text="Cancel" @click="onCancelClickHandler" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ToastContainer :placement="TOP_LEFT">
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { OK_ICON } from "@/constants/icons";
import SearchPanel from "@/components/search/SearchPanel.vue";
import InputContainer from "@/components/form/InputContainer.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { TOP_LEFT } from "@/constants/toasts";
import FormButton from "@/components/button/FormButton.vue";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import moment from "moment";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";
import { Modal } from "bootstrap";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";

const addItemModalRef: Ref<HTMLDivElement | null> = ref(null);

const medicinesStore = useMedicinesStore();
const customerOrdersStore = useCustomersOrdersStore();

const medicines: Ref<MedicineDto[]> = ref([]);

const toastError = ref();
const issueUnitQuantityRef: Ref<HTMLInputElement | null> = ref(null);

const issueUnitQuantityValidation = (value: string) => {
  if (!value)
    return "This is a required field";

  if (!useIsNumeric(value).value)
    return "The issue unit quantity should be a number";

  if (+value <= 0) {
    return "The issue unit quantity not be less than or equal to 0";
  }

  return true;
};

const {
  value: issueUnitQuantity,
  errorMessage: issueUnitQuantityErrorMessage,
  meta: issueUnitQuantityMeta
} = useField("issueUnitQuantity", issueUnitQuantityValidation);

const addItemModal: Ref<Modal | null> = ref(null);

const emit = defineEmits(["on-hidden-bs-modal"]);

onMounted(
  () => {
    if (addItemModalRef.value) {

      addItemModal.value = new Modal(addItemModalRef.value);

      addItemModalRef.value?.addEventListener("shown.bs.modal", function() {
        issueUnitQuantityRef.value?.focus();
      });

      emit("on-hidden-bs-modal");
    }
  }
);

try {
  medicines.value = await medicinesStore.fetchMedicines();
} catch (error: any) {

  console.error(error);

  toastError.value?.setupToast({
    name: "FailToFetchMedicines",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Medicines Error",
    text: "Failed to fetch medicines from the server",
    delay: 5000
  });

  toastError.value?.show();
}

interface SearchPairs {
  name: string;
  id: string;
}

const medicineSearchPairs: Ref<SearchPairs[]> = ref([]);

medicineSearchPairs.value = medicines.value.map(value => ({ id: value.id, name: value.name }));

const currentFoundItem: Ref<SearchPairs | null> = ref(null);

const onFoundItemHandler = (item: SearchPairs) => {
  currentFoundItem.value = item;
};

const onAddClickHandler = () => {

  toastError.value?.setupToast({
    name: "Add customer order",
    elapsedDuration: moment().startOf("seconds").fromNow(),
    heading: "Add Customer Order",
    text: "The item is already present in the order! Did you mean to update ?",
    delay: 6000
  });

  if (customerOrdersStore.getItems.some(value => value.medicine === currentFoundItem.value?.name)) {
    addItemModal.value?.hide();
    toastError.value.show();
  } else {
    customerOrdersStore.addItem({
      id: currentFoundItem.value?.id as string,
      name: currentFoundItem.value?.name as string,
      quantity: +issueUnitQuantity.value
    });

    addItemModal.value?.hide();
  }

};

const onCancelClickHandler = () => {
  addItemModal.value?.hide();
};

defineExpose({
  showModal: () => addItemModal.value?.show(),
  hideModal: () => addItemModal.value?.hide(),
  setFocus: (inputEl: HTMLInputElement | null) => {

  }
});

onUnmounted(
  () => {
    addItemModalRef.value?.removeEventListener("shown.bs.modal", function() {
    });
  }
);
</script>

<style scoped>

</style>
