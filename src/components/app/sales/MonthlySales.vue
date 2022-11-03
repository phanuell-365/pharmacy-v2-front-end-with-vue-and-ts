<template>
  <section class="manage-medicines">
    <TableContainer skin="light" xlarge>
      <TableHead class="sticky-top">
        <PlainTableHeader
          :field-names="salesStore.getMonthlySalesAttributes"
          scope="col"
        />
        <th>Action</th>
      </TableHead>
      <TableBody>
        <TableRow
          :col-count="salesStore.getMonthlySalesAttributes.length + 1"
          :records="monthlySales"
        >
          <template #default="{ record }">
            <PlainTableData
              :field-names="salesStore.getMonthlySalesAttributes"
              :record="record"
            />
            <td class="text-center">
              <button
                class="btn btn-secondary btn-sm px-2"
                @click="onRowClick(record)"
              >
                View
              </button>
            </td>
          </template>
        </TableRow>
      </TableBody>
    </TableContainer>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import TableContainer from "@/components/table/TableContainer.vue";
import TableHead from "@/components/table/TableHead.vue";
import PlainTableHeader from "@/components/table/plain/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableRow from "@/components/table/TableRow.vue";
import PlainTableData from "@/components/table/plain/TableData.vue";
import { TOP_CENTER } from "@/constants/toasts";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import moment from "moment";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { Ref } from "vue";
import { ref } from "vue";
import type { MonthlySalesDto } from "@/stores/app/sales/dto";
import { useRouter } from "vue-router";

const salesStore = useSalesStore();

const router = useRouter();

const toastError: Ref<InstanceType<LiveToast>> = ref();

const monthlySales: Ref<MonthlySalesDto[]> = ref([]);
const orgMonthlySales: Ref<MonthlySalesDto[]> = ref([]);

try {
  monthlySales.value = await salesStore.getMonthlyReports();
  monthlySales.value = monthlySales.value.map((value) => {
    value.saleDate = new Date(value.saleDate).toDateString();
    return value;
  });
  orgMonthlySales.value = await salesStore.getMonthlyReports();
} catch (error: any) {
  toastError.value?.setupToast({
    name: "Fetch Monthly Sales Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Monthly Sales Error",
    text: error.message,
    delay: 5000,
  });

  toastError.value?.show();

  console.error(error);
}

const onRowClick = (record: MonthlySalesDto) => {
  const dailySale = orgMonthlySales.value.find(
    (value) => new Date(value.saleDate).toDateString() === record.saleDate
  );
  if (dailySale)
    router.push(
      `/sales/reports/daily-sales/${new Date(
        dailySale?.saleDate
      ).toUTCString()}`
    );
};
</script>

<style scoped></style>
