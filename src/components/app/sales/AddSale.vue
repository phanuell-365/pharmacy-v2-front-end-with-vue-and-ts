<template>
  <div class="container">
    <main>
      <div class="row g-5">

        <CheckoutContainer :list="listItems" />

        <div class="col-md-7 col-lg-8">
          <form class="needs-validation row g-3 m-4" novalidate @submit.prevent>
            <hr class="my-4">

            <InputContainer :invalid-feedback="CustomerIdErrorMessage" input-id="CustomerId" input-label="Customer">
              <select
                id="validationCustomerId"
                v-model.trim="CustomerId"
                class="form-select"
                name="CustomerId"
                required
              >
                <option
                  v-for="customer in customers"
                  :key="customer.name"
                  :value="customer.id"
                >
                  {{ startCase(customer.name) }}
                </option>
              </select>
            </InputContainer>

            <InputContainer input-id="Medicine" input-label="Medicine">
              <SearchFilter />
            </InputContainer>
            <hr class="my-4">

            <div class="d-flex w-75 justify-content-end ms-auto">
              <FormButton skin="info" text="add" />
              <FormButton :text="`add & new`" skin="dark" />
              <FormButton :text="`add & view`" outline skin="dark" />
              <FormButton :text="`clear`" outline skin="danger" />
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import CheckoutContainer from "@/components/checkout/CheckoutContainer.vue";
import FormButton from "@/components/button/FormButton.vue";
import SearchFilter from "@/components/search/SearchFilter.vue";
import InputContainer from "@/components/form/InputContainer.vue";
import startCase from "lodash/startCase";
import type { Ref } from "vue";
import { ref } from "vue";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useField } from "vee-validate";

const customersStore = useCustomersStore();

const customers: Ref<CustomerDto[]> = ref([]);

try {
  customers.value = await customersStore.fetchCustomers();
} catch (error: any) {
  console.error(error);
}

const CustomerIdValidation = (value: string) => {
  if (!value)
    return "This is a required field";

  return true;
};

const {
  value: CustomerId,
  errorMessage: CustomerIdErrorMessage,
  meta: CustomerIdMeta
} = useField("CustomerId", CustomerIdValidation);

interface CheckoutListItemProps {
  medicineName: string;
  medicinePrice: number;
}

const listItems: Ref<CheckoutListItemProps[]> = ref([
  {
    medicineName: "Paracetamol",
    medicinePrice: 25
  },
  {
    medicineName: "Amoxicillin",
    medicinePrice: 30
  },
  {
    medicineName: "Mara Moja",
    medicinePrice: 10
  },
  {
    medicineName: "Erythromycin",
    medicinePrice: 50
  }
]);

const onAddItemClick = () => {
  listItems.value.unshift(
    {
      medicineName: "Erythromycin" + new Date().getSeconds(),
      medicinePrice: 50
    }
  );
};

</script>

<style scoped>

</style>
