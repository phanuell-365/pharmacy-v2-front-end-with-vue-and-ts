<template>
  <div class="scroll-table">
    <table
      class="table table-success table-hover table-bordered table-striped table-sm table-responsive table-responsive-md table-responsive-sm">
      <thead class="">
      <tr>
        <TableHeader :field-names="fieldNames" scope="col" />
      </tr>
      </thead>
      <tbody>
      <TableRow :col-count="fieldNames.length" :records="records">
        <template #default="{record}">
          <TableData :field-names="fieldNames" :record="record" @clicked-row="onRowClick" />
        </template>
      </TableRow>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import TableHeader from "./plain/TableHeader.vue";
import TableRow from "./TableRow.vue";
import TableData from "./plain/TableData.vue";

interface TableContainerProps {
  fieldNames: string[];
  records: object[];
}

defineProps<TableContainerProps>();

const emit = defineEmits<{ (e: "clicked-row", record: object): void }>();

const onRowClick = (record: object) => {
  emit("clicked-row", record);
};
</script>

<style scoped>
.scroll-table {
  position: relative;
  height: 150px;
  overflow: auto;
}
</style>
