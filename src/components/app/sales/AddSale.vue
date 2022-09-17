<template>
  <div class="container">
    <main>
      <div class="row g-5">

        <CheckoutContainer :list="listItems" />

        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>
          <button class="btn btn-success p-2" @click="onAddItemClick">+</button>
          <form class="needs-validation" novalidate>

            <hr class="my-4">

            <div class="row gy-3">
              <div class="col-md-6">
                <label class="form-label" for="cc-name">Name on card</label>
                <input id="cc-name" class="form-control" placeholder="" required type="text">
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div class="col-md-6">
                <label class="form-label" for="cc-number">Credit card number</label>
                <input id="cc-number" class="form-control" placeholder="" required type="text">
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label class="form-label" for="cc-expiration">Expiration</label>
                <input id="cc-expiration" class="form-control" placeholder="" required type="text">
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div class="col-md-3">
                <label class="form-label" for="cc-cvv">CVV</label>
                <input id="cc-cvv" class="form-control" placeholder="" required type="text">
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>

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
import type { Ref } from "vue";
import { ref } from "vue";

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
