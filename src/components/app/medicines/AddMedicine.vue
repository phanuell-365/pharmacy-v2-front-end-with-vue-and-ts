<template>
  <form ref="formRef" class="row g-3 m-4" novalidate @submit.prevent>

    <!--  name  -->
    <InputContainer :invalid-feedback="nameErrorMessage" input-id="name" input-label="name">
      <input id="validationName" v-model="name" :class="{'is-invalid': !nameMeta.valid && nameMeta.validated}"
             class="form-control" name="name"
             required
             type="text" />
    </InputContainer>

    <!--  doseForm  -->
    <InputContainer :invalid-feedback="doseFormErrorMessage" input-id="doseForm" input-label="doseForm">
      <select id="validationDoseForm" v-model.trim="doseForm"
              :class="{'is-invalid': !doseFormMeta.valid && doseFormMeta.validated}"
              class="form-select" name="doseForm" required>
        <option v-for="_doseForm in medicineDoseForms"
                :key="_doseForm" :value="_doseForm">
          {{ _doseForm }}
        </option>
      </select>
    </InputContainer>

    <!--  strength  -->
    <InputContainer :invalid-feedback="strengthErrorMessage" input-id="strength" input-label="strength">
      <input id="validationStrength" v-model="strength"
             :class="{'is-invalid': !strengthMeta.valid && strengthMeta.validated}" class="form-control" name="strength"
             type="text">
    </InputContainer>

    <!--  levelOfUse  -->
    <InputContainer :invalid-feedback="levelOfUseErrorMessage" input-id="levelOfUse" input-label="levelOfUse">
      <input id="validationLevelOfUse" v-model="levelOfUse"
             :class="{'is-invalid': !levelOfUseMeta.valid && levelOfUseMeta.validated}" class="form-control"
             name="levelOfUse" type="text" />
    </InputContainer>

    <!-- therapeuticClass  -->
    <InputContainer :invalid-feedback="therapeuticClassErrorMessage" input-id="therapeuticClass"
                    input-label="therapeuticClass">
      <input id="validationTherapeuticClass" v-model="therapeuticClass"
             :class="{'is-invalid': !therapeuticClassMeta.valid && therapeuticClassMeta.validated}" class="form-control"
             name="therapeuticClass"
             type="text" />
    </InputContainer>

    <FormButtonsContainer>
      <FormButton skin="primary" text="add" @click="onAddClick" />
      <FormButton skin="secondary" text="add & new" @click="onAddAndNewClick" />
      <FormButton outline skin="dark" text="add & view" @click="onAddAndView" />
      <FormButton outline skin="secondary" text="add & view all" @click="onAddAndViewAll" />
      <FormButton outline skin="danger" text="clear" @click="onClear" />
    </FormButtonsContainer>
  </form>
  <Teleport to="body">
    <ToastContainer :placement="TOP_CENTER">
      <LiveToast ref="toastSuccess" skin="info" @on-hidden-bs-toast="onHiddenBsToast" />
      <LiveToast ref="toastError" skin="danger" />
    </ToastContainer>
  </Teleport>
</template>

<script lang="ts" setup>
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { useField } from "vee-validate";
import type { Ref } from "vue";
import { ref } from "vue";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { NewMedicineDto } from "@/stores/app/medicines/dto";
import { TOP_CENTER } from "@/constants/toasts";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const medicinesStore = useMedicinesStore();

const medicineDoseForms: Ref<string[]> = ref([]);
const medicineStrengths: Ref<string[]> = ref([]);

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

try {
  medicineDoseForms.value = await medicinesStore.fetchMedicineDoseForms();
  medicineStrengths.value = await medicinesStore.fetchMedicineStrengths();
} catch (error: any) {
  toastError.value?.setupToast({
    name: "Roles Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Roles Error",
    text: "Failed to fetch roles from the server",
    delay: 5000
  });

  toastError.value?.show();
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

console.log(medicineStrengthsStr.value.replace(/,/g, "|"));


const strengthValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  const strengthRegExp = ref("(" + medicineStrengthsStr.value.replace(/,/g, "|") + ")");
  const strengthRegExp2 = "\\b\\d+\\s+";
  const pattern = new RegExp(strengthRegExp2 + strengthRegExp.value + "$\\w*", "gi");

  if (!new RegExp(pattern, "gi").test(value)) {
    return "Enter a valid medicine strength i.e 500 mg";
  }

  return true;
};

const levelOfUseValidation = (value: any) => {
  if (!value) {
    return "This is field is required";
  }

  if (!/^\d+$/.test(value)) {
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

const { value: name, errorMessage: nameErrorMessage, meta: nameMeta } = useField("name", nameValidation);
const {
  value: doseForm,
  errorMessage: doseFormErrorMessage,
  meta: doseFormMeta
} = useField("doseForm", doseFormValidation);

const {
  value: strength,
  errorMessage: strengthErrorMessage,
  meta: strengthMeta
} = useField("strength", strengthValidation);

const {
  value: levelOfUse,
  errorMessage: levelOfUseErrorMessage,
  meta: levelOfUseMeta
} = useField("levelOfUse", levelOfUseValidation);

const {
  value: therapeuticClass,
  errorMessage: therapeuticClassErrorMessage,
  meta: therapeuticClassMeta
} = useField("therapeuticClass", therapeuticClassValidation);

const validateForm = () => {
  const form = formRef.value as HTMLFormElement;

  if (doseFormMeta.valid && nameMeta.valid && strengthMeta.valid && levelOfUseMeta && therapeuticClassMeta.valid) {
    form.classList.remove("was-validated");
    return true;
  } else {
    form.classList.add("was-validated");
  }
};

const createMedicinePayload = () => {
  const payload: NewMedicineDto = {
    name: name.value,
    doseForm: doseForm.value,
    strength: strength.value,
    levelOfUse: +levelOfUse.value,
    therapeuticClass: therapeuticClass.value
  };

  return payload;
};

const addMedicine = async (payload: NewMedicineDto) => {
  try {
    const medicine = await medicinesStore.addMedicine(payload);
    toastSuccess.value?.setupToast({
      name: "Add Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Medicine",
      text: "Added the medicine successfully!",
      delay: 3000
    });

    toastSuccess.value?.show();

    return medicine;

  } catch (error: any) {
    console.error(error);
    toastError.value?.setupToast({
      name: "Add Medicine Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Medicine Error",
      text: "Failed to add the medicine",
      delay: 5000
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onAddClick = async () => {
  // validate the form
  if (validateForm()) {
    await addMedicine(createMedicinePayload());
  }
};

const onAddAndNewClick = async () => {
  // validate the form
  if (validateForm()) {
    await addMedicine(createMedicinePayload());
    routeRedirect.value = "current";
  }
};

const onAddAndView = async () => {

  // validate the form
  if (validateForm()) {
    const medicine = await addMedicine(createMedicinePayload());

    routeRedirect.value = `/medicines/${medicine?.id}`;
  }
};

const onAddAndViewAll = async () => {

  // validate the form
  if (validateForm()) {
    await addMedicine(createMedicinePayload());

    routeRedirect.value = "/medicines";
  }
};

const onClear = () => {

  // select the form using the formRef
  const form = formRef.value as HTMLFormElement;

  // call reset
  form?.reset();
};

const onHiddenBsToast = () => {
  if (routeRedirect.value === "current")
    router.go(0);

  router.push(routeRedirect.value);
};

</script>

<style scoped>

</style>
