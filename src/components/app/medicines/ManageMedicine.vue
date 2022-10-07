<template>
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>
    <!--  name  -->
    <InputContainer
      :invalid-feedback="nameErrorMessage"
      input-id="name"
      input-label="name"
    >
      <input
        id="validationName"
        v-model="name"
        :class="{ 'is-invalid': !nameMeta.valid && nameMeta.validated }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="name"
        required
        type="text"
      />
    </InputContainer>

    <!--  doseForm  -->
    <InputContainer
      :invalid-feedback="doseFormErrorMessage"
      input-id="doseForm"
      input-label="doseForm"
    >
      <select
        id="validationDoseForm"
        v-model.trim="doseForm"
        :class="{ 'is-invalid': !doseFormMeta.valid && doseFormMeta.validated }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-select"
        name="doseForm"
        required
      >
        <option
          v-for="_doseForm in medicineDoseForms"
          :key="_doseForm"
          :value="_doseForm"
        >
          {{ _doseForm }}
        </option>
      </select>
    </InputContainer>

    <!--  strength  -->
    <InputContainer
      :invalid-feedback="strengthErrorMessage"
      input-id="strength"
      input-label="strength"
    >
      <input
        id="validationStrength"
        v-model="strength"
        :class="{ 'is-invalid': !strengthMeta.valid && strengthMeta.validated }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="strength"
        type="text"
      />
    </InputContainer>

    <!--  levelOfUse  -->
    <InputContainer
      :invalid-feedback="levelOfUseErrorMessage"
      input-id="levelOfUse"
      input-label="levelOfUse"
    >
      <input
        id="validationLevelOfUse"
        v-model="levelOfUse"
        :class="{
          'is-invalid': !levelOfUseMeta.valid && levelOfUseMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="levelOfUse"
        type="text"
      />
    </InputContainer>

    <!-- therapeuticClass  -->
    <InputContainer
      :invalid-feedback="therapeuticClassErrorMessage"
      input-id="therapeuticClass"
      input-label="therapeuticClass"
    >
      <input
        id="validationTherapeuticClass"
        v-model="therapeuticClass"
        :class="{
          'is-invalid':
            !therapeuticClassMeta.valid && therapeuticClassMeta.validated,
        }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="therapeuticClass"
        type="text"
      />
    </InputContainer>

    <InputContainer
      :invalid-feedback="packSizeErrorMessage"
      input-id="packSize"
      input-label="packSize"
    >
      <input
        id="validationPackSize"
        v-model.trim="packSize"
        :class="{ 'is-invalid': !packSizeMeta.valid && packSizeMeta.validated }"
        :disabled="!setUpdateMode && setViewMode"
        class="form-control"
        name="packSize"
        required
        type="text"
      />
    </InputContainer>

    <FormButtonsContainer>
      <FormButton skin="primary" text="Update" @click="onUpdateClick" />
      <FormButton skin="secondary" text="Add New" @click="onAddNewClick" />
      <FormButton
        v-if="setUpdateMode && !setViewMode"
        outline
        skin="secondary"
        text="View"
        @click="onViewClick"
      />
      <FormButton
        outline
        skin="secondary"
        text="View All"
        @click="onViewAllClick"
      />
      <FormButton outline skin="danger" text="Delete" @click="onDeleteClick" />
    </FormButtonsContainer>
  </form>
  <Teleport to="body">
    <ToastContainer :placement="TOP_CENTER">
      <LiveToast
        ref="toastUpdate"
        skin="info"
        @on-hidden-bs-toast="onHiddenBsToast"
      />
      <LiveToast
        ref="toastWarning"
        skin="warning"
        @on-hidden-bs-toast="onHiddenBsToast"
      />
      <LiveToast ref="toastError" skin="danger" />
    </ToastContainer>
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
  </Teleport>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import type {
  MedicineDto,
  UpdateMedicineDto,
} from "@/stores/app/medicines/dto";
import { useRouter } from "vue-router";
import { useIsNumeric } from "@/composables/is-numeric";
import { useField } from "vee-validate";
import moment from "moment";
import startCase from "lodash/startCase";

interface ManageMedicineProps {
  medicineId: string;
  updateMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageMedicineProps>();

const medicinesStore = useMedicinesStore();

const medicine: Ref<MedicineDto | null> = ref(null);
const medicineDoseForms: Ref<string[]> = ref([]);
const medicineStrengths: Ref<string[]> = ref([]);

const formRef: Ref<HTMLFormElement | null> = ref(null);
const toastUpdate: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

try {
  medicine.value = await medicinesStore.fetchMedicineById(props.medicineId);
  medicineDoseForms.value = await medicinesStore.fetchMedicineDoseForms();
  medicineStrengths.value = await medicinesStore.fetchMedicineStrengths();
} catch (error: any) {
  console.log(error.message);

  if (error.message === "Medicine not found!") {
    router.push(`/errors/medicines/${props.medicineId}`);
  } else {
    toastError.value?.setupToast({
      name: "Roles Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Roles Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
}

const nameValidation = (value: any) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const doseFormValidation = (value: any) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const medicineStrengthsStr = ref(medicineStrengths.value.toString());

const strengthValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  const strengthRegExp = ref(
    "(" + medicineStrengthsStr.value.replace(/,/g, "|") + ")"
  );
  const strengthRegExp2 = "\\b\\d+\\s+";
  const pattern = new RegExp(
    strengthRegExp2 + strengthRegExp.value + "$\\w*",
    "gi"
  );

  if (!new RegExp(pattern, "gi").test(value)) {
    return "Enter a valid medicine strength i.e 500 mg";
  }

  return true;
};

const levelOfUseValidation = (value: any) => {
  if (!value) {
    return "This is field is required";
  }

  if (!useIsNumeric(value).value) {
    return "The level of use should be a number";
  }

  if (value < 1) {
    return "The level of use may not be less than 1";
  }

  if (value >= 7) {
    return "The level of use may not be equal to or greater than 7";
  }

  return true;
};

const therapeuticClassValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const packSizeValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const {
  value: name,
  errorMessage: nameErrorMessage,
  meta: nameMeta,
} = useField("name", nameValidation);
const {
  value: doseForm,
  errorMessage: doseFormErrorMessage,
  meta: doseFormMeta,
} = useField("doseForm", doseFormValidation);

const {
  value: strength,
  errorMessage: strengthErrorMessage,
  meta: strengthMeta,
} = useField("strength", strengthValidation);

const {
  value: levelOfUse,
  errorMessage: levelOfUseErrorMessage,
  meta: levelOfUseMeta,
} = useField("levelOfUse", levelOfUseValidation);

const {
  value: therapeuticClass,
  errorMessage: therapeuticClassErrorMessage,
  meta: therapeuticClassMeta,
} = useField("therapeuticClass", therapeuticClassValidation);

const {
  value: packSize,
  errorMessage: packSizeErrorMessage,
  meta: packSizeMeta,
} = useField("packSize", packSizeValidation);

name.value = medicine.value?.name;
doseForm.value = medicine.value?.doseForm;
strength.value = medicine.value?.strength as string;
levelOfUse.value = medicine.value?.levelOfUse;
therapeuticClass.value = medicine.value?.therapeuticClass as string;
packSize.value = medicine.value?.packSize as string;

const validateForm = () => {
  if (
    doseFormMeta.valid &&
    nameMeta.valid &&
    strengthMeta.valid &&
    levelOfUseMeta &&
    therapeuticClassMeta.valid
  ) {
    return true;
  } else {
    toastError.value?.setupToast({
      name: "Update Medicine Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Medicine Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const createUpdateMedicinePayload = () => {
  const payload: UpdateMedicineDto = {
    name: startCase(name.value),
    doseForm: doseForm.value,
    strength: strength.value,
    levelOfUse: +levelOfUse.value,
    therapeuticClass: startCase(therapeuticClass.value),
  };

  return payload;
};

const updateMedicine = async (payload: UpdateMedicineDto) => {
  try {
    const updatedMedicine = await medicinesStore.updateMedicine(
      props.medicineId,
      payload
    );

    toastUpdate.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update Medicine",
      text: "Updated the medicine successfully!",
      delay: 3000,
    });

    toastUpdate.value?.show();

    return updatedMedicine;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update Medicine Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Update Error",
      text: "Failed to update the medicine. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateMedicine(createUpdateMedicinePayload());
  } else {
    setUpdateMode.value = true;
    setViewMode.value = false;
  }
};

const onViewClick = () => {
  setUpdateMode.value = false;
  setViewMode.value = true;
};

const onAddNewClick = async () => {
  await router.push("/medicines/create");
};

const onViewAllClick = async () => {
  await router.push("/medicines");
};

const onDeleteClick = async () => {
  deleteModalRef.value.setUpModal({
    secondaryHeader: "Are you sure you want to delete this medicine?",
    primaryHeader: "Click yes to delete and cancel to exit.",
  });

  deleteModalRef.value.showModal();
};

const response: Ref<string | undefined> = ref();

const onDeleteMedicine = async () => {
  try {
    response.value = await medicinesStore.deleteMedicine(props.medicineId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete Medicine Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete Medicine Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();
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
  router.push(routeRedirect.value);
};
</script>

<style scoped></style>
