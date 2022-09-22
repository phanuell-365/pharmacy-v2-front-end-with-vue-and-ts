<template>
  <section class="manage-medicines">
    <SearchTable :attributes="medicinesStore.getMedicineAttributes" :records="medicines" name="medicine"
                 null-comment="Medicine not found" search-by="name"
                 search-term="medicine">
      <template #actions="{recordId}">
        <ButtonLinkIcon :href="`/medicines/${recordId}`" action="view" />
        <ButtonLinkIcon :href="`/medicines/${recordId}/update`" action="update" />
        <ButtonLinkIcon :href="`/medicines/${recordId}`" action="delete" />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { Ref } from "vue";
import { ref } from "vue";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import moment from "moment";

const medicinesStore = useMedicinesStore();

const medicines: Ref<MedicineDto[] | undefined> = ref();

const toastSuccess = ref();
const toastError = ref();

try {
  medicines.value = await medicinesStore.fetchMedicines();
} catch (error: any) {

  console.error(error);

  toastError.value?.setupToast({
    name: "Fetch Medicines Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Medicines Error",
    text: "Failed to fetch medicines from the server",
    delay: 5000
  });

  toastError.value?.show();
}
</script>

<style scoped>

</style>
