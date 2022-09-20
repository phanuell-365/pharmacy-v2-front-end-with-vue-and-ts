<template>
  <main class="container">
    <form class="needs-validation" novalidate @submit.prevent>
      <div class="row g-3 mb-3">
        <CheckoutContainer :customer-name="Customer" :list="[{medicineName: 'Mara Moja', medicinePrice: 15}]"
                           @update-item="onUpdateItem" />
        <div class="col-md-7 flex-grow-1">
          <div class="row g-3">
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input id="inlineRadioCustomer" v-model="radio" :checked="showCustomersTable" class="form-check-input"
                       name="radioTableOptions"
                       type="radio" value="customer">
                <label class="form-check-label" for="inlineRadioCustomer">Customers</label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input id="inlineRadioMedicine" v-model="radio" class="form-check-input" name="radioTableOptions"
                       type="radio"
                       value="medicine">
                <label class="form-check-label" for="inlineRadioMedicine">Medicines</label>
              </div>
            </div>

            <Transition mode="out-in" name="table">
              <div v-if="showMedicinesTable" class="row">
                <InputContainer :invalid-feedback="MedicineIdErrorMessage" input-id="Medicine" input-label="Medicine">
                  <input id="validationMedicineId" v-model="Medicine"
                         :class="{'is-invalid': !MedicineIdMeta.valid && MedicineIdMeta.validated}"
                         :placeholder="MedicinePlaceholder"
                         class="form-control"
                         name="name" required
                         type="text" />
                </InputContainer>

                <InputContainer :invalid-feedback="issueUnitQuantityErrorMessage" input-id="issueUnitQuantity"
                                input-label="issueUnitQuantity">
                  <input id="validationIssueUnitQuantity" v-model="issueUnitQuantity"
                         :class="{'is-invalid': !issueUnitQuantityMeta.valid && issueUnitQuantityMeta.validated}"
                         class="form-control"
                         name="issueUnitQuantity" required
                         type="text">
                </InputContainer>

                <TableContainer class="my-2" skin="light">
                  <TableHead class="sticky-top">
                    <PlainTableHeader :field-names="medicineRecordAttributes" scope="col" />
                    <th>
                      Actions
                    </th>
                  </TableHead>
                  <TableBody>
                    <TableRow :col-count="medicineRecordAttributes.length + 1" :records="medicineRecords">
                      <template #default="{record}">
                        <PlainTableData :field-names="medicineRecordAttributes" :record="record" />
                        <td class="text-center">
                          <FormButton skin="primary" text="Select"
                                      @click="onMedicineChoiceClick(record)" />
                          <FormButton v-if="updateMode" skin="secondary" text="Update" @click="onUpdateMedicineClick" />
                          <FormButton v-else :disabled="!issueUnitQuantityMeta.valid || !MedicineIdMeta.valid"
                                      skin="success" text="Add"
                                      @click="onAddMedicineClick( +issueUnitQuantity)" />
                        </td>
                      </template>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              </div>

              <div v-else-if="showCustomersTable" class="row">
                <InputContainer :invalid-feedback="CustomerIdErrorMessage" input-id="CustomerId" input-label="Customer">
                  <input id="validationMedicineId" v-model="Customer"
                         :class="{'is-invalid': !CustomerIdMeta.valid && CustomerIdMeta.validated}"
                         :placeholder="CustomerPlaceholder"
                         class="form-control"
                         name="name" required
                         type="text" />
                </InputContainer>

                <TableContainer class="my-2" skin="light">
                  <TableHead class="sticky-top">
                    <PlainTableHeader :field-names="customerAttributes" scope="col" />
                    <th>
                      Actions
                    </th>
                  </TableHead>
                  <TableBody>
                    <TableRow :col-count="customerAttributes.length + 1" :records="customers">
                      <template #default="{record}">
                        <PlainTableData :field-names="customerAttributes" :record="record" />
                        <td class="text-center">
                          <FormButton skin="primary" text="Select" @click="onCustomerChoiceClick(record)" />
                          <!--              <button class="btn btn-primary btn-sm px-2" >Select</button>-->
                        </td>
                      </template>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <FormButtonContainer>
        <FormButton skin="info" text="add" />
        <FormButton :text="`add & new`" skin="dark" />
        <FormButton :text="`add & view`" outline skin="dark" />
        <FormButton :text="`clear`" outline skin="danger" />
      </FormButtonContainer>
    </form>
  </main>
</template>

<script lang="ts" setup>
import CheckoutContainer from "@/components/checkout/CheckoutContainer.vue";
import FormButtonContainer from "@/components/form/FormButtonsContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import InputContainer from "@/components/form/InputContainer.vue";
import TableContainer from "@/components/table/TableContainer.vue";
import TableHead from "@/components/table/TableHead.vue";
import PlainTableHeader from "@/components/table/plain/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableRow from "@/components/table/TableRow.vue";
import PlainTableData from "@/components/table/plain/TableData.vue";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useField } from "vee-validate";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useStocksStore } from "@/stores/app/stock/stocks";
import type { StockDto } from "@/stores/app/stock/dto";
import { useIsNumeric } from "@/composables/is-numeric";
import { useCustomersOrdersStore } from "@/stores/app/sales/customers-orders";

const customersStore = useCustomersStore();
const medicinesStore = useMedicinesStore();
const stocksStore = useStocksStore();
const customersOrdersStore = useCustomersOrdersStore();

const customers: Ref<CustomerDto[]> = ref([]);
const medicines: Ref<MedicineDto[]> = ref([]);
const stocks: Ref<StockDto[]> = ref([]);
const MedicineId: Ref<string> = ref("");
const CustomerId: Ref<string> = ref("");

try {
  customers.value = await customersStore.fetchCustomers();
  medicines.value = await medicinesStore.fetchMedicines();
  stocks.value = await stocksStore.fetchStocks();
} catch (error: any) {
  console.error(error);
}

interface MedicineRecord {
  medicine: string;
  doseForm?: string;
  price: string;
  levelOfUse?: number;
  expiryDate: string;
}

const medicineRecords: Ref<MedicineRecord[]> = ref([]);
const medicineRecordAttributes: Ref<string[]> = ref([]);
const customerAttributes: Ref<string[]> = ref([]);

medicineRecords.value = stocks.value.map(
  (value) => {
    const tempMedicine = medicines.value.find(value1 => value1.name === value.medicine);

    const tempVal: MedicineRecord = {
      medicine: value.medicine,
      doseForm: tempMedicine?.doseForm,
      price: `Kshs. ${value.issueUnitPrice}`,
      // levelOfUse: tempMedicine?.levelOfUse,
      expiryDate: new Date(value.expirationDate).toLocaleDateString()
    };

    return tempVal;
  });

medicineRecordAttributes.value = Object.keys(medicineRecords.value[0]);
customerAttributes.value = Object.keys(customers.value[0]).filter(value => value !== "id");

const medicineNames = ref(medicines.value.map(value => value.name));
const customerNames = ref(customers.value.map(value => value.name));

const CustomerIdValidation = (value: string) => {
  // if (!value)
  //   return "This is a required field";

  if (!customerNames.value.some(value1 => value1?.toLowerCase().includes(value?.toLowerCase())))
    return "The customer should be one of the ones on the table";

  return true;
};

const MedicineIdValidation = (value: string) => {
  // if (!value)
  //   return "This is a required field";

  if (!medicineNames.value.some(value1 => value1?.toLowerCase().includes(value?.toLowerCase())))
    return "The medicine should be one of the ones on the table";


  return true;
};

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
  value: Customer,
  errorMessage: CustomerIdErrorMessage,
  meta: CustomerIdMeta
} = useField("CustomerId", CustomerIdValidation);

const {
  value: Medicine,
  errorMessage: MedicineIdErrorMessage,
  meta: MedicineIdMeta
} = useField("MedicineId", MedicineIdValidation);

const {
  value: issueUnitQuantity,
  errorMessage: issueUnitQuantityErrorMessage,
  meta: issueUnitQuantityMeta
} = useField("issueUnitQuantity", issueUnitQuantityValidation);

const showCustomersTable = ref(true);
const showMedicinesTable = ref(false);

const radio = ref("");

watch(radio, (value) => {
  if (value === "customer") {
    showCustomersTable.value = true;
    showMedicinesTable.value = false;
  } else if (value === "medicine") {
    showCustomersTable.value = false;
    showMedicinesTable.value = true;
  }
});

const MedicinePlaceholder = ref("Search ...");
const CustomerPlaceholder = ref("Search ...");

const medicineRecordsClone = ref([...medicineRecords.value]);

watch(Medicine,
  (value) => {
    medicineRecords.value = medicineRecordsClone.value.sort().filter(value1 => {
      if (value1) {
        const searchValue = value1.medicine.toLowerCase();
        return searchValue.includes(value.toLowerCase());
      }
      return true;
    });

    MedicinePlaceholder.value = medicineRecords.value[0]?.medicine;
  }
);

const customersClone = ref([...customers.value]);

watch(Customer,
  (value) => {
    customers.value = customersClone.value.sort().filter(value1 => {
      if (value1) {
        const searchValue = value1.name.toLowerCase();

        return searchValue.includes(value.toLowerCase());
      }

      return true;
    });

    CustomerPlaceholder.value = customers.value[0]?.name;
  }
);

const onCustomerChoiceClick = (customer: CustomerDto) => {
  Customer.value = customer.name;
  CustomerId.value = customer.id;

  showCustomersTable.value = false;
  showMedicinesTable.value = true;

};

const onMedicineChoiceClick = (medicine: MedicineRecord) => {
  Medicine.value = medicine.medicine;
  MedicineId.value = medicines.value.find(value => value.name === medicine.medicine)?.id as string;
};

const onAddMedicineClick = (quantity: number) => {

  customersOrdersStore.addItem({
    medicineName: Medicine.value,
    medicinePrice: stocks.value.find(value => value.medicine === Medicine.value)?.issueUnitPrice as number,
    medicineQuantity: quantity
  });

  Medicine.value = "";
  issueUnitQuantity.value = "";
  issueUnitQuantityMeta.valid = true;
};

interface MedicineQuantityUpdate {
  productName: string;
  productPrice: number;
  productQuantity: number;
}

const updateMode = ref(false);

const onUpdateItem = (medicine: MedicineQuantityUpdate) => {
  updateMode.value = true;
  medicineRecords.value = medicineRecordsClone.value.filter(value => value.medicine === medicine.productName);
  Medicine.value = medicine.productName;
  issueUnitQuantity.value = medicine.productQuantity.toString();
};

const onUpdateMedicineClick = () => {
  customersOrdersStore.updateItemQuantity({
    medicineName: Medicine.value,
    newQuantity: +issueUnitQuantity.value
  });

  medicineRecords.value = [...medicineRecordsClone.value];
  updateMode.value = false;
};
</script>

<style scoped>
.d-flex > .vr {
  height: auto;
}

.table-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.table-enter-active, .table-leave-active {
  transition: all 0.6s ease-in;
  opacity: 0.5;
}

.table-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.table-leave-from {
  opacity: 1;
  transform: translateX(60px);
}

.table-leave-to {
  opacity: 0;
  transform: translateX(0);
}
</style>
