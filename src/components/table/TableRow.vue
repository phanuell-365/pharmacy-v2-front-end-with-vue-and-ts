<template>
  <template v-if="records?.length > 0">
    <tr v-for="(record, index) in records" :key="record.id" tabindex="0">
      <th scope="row">{{ index + 1 }}</th>
      <slot :record="record" />
    </tr>
  </template>
  <template v-else>
    <tr>
      <td :colspan="colCount + 1">
        <p class="lead fs-6 text-center m-auto">No data to display</p>
      </td>
    </tr>
  </template>
</template>

<script lang="ts" setup>

interface TableRowProps {
  records: object[];
  colCount: number;
}

const props = defineProps<TableRowProps>();

// const colspan = computed(() => {
//   // const attributes = Object.keys(props.records[0]);
//   const attributes = [0, 0, 0, 0, 0, 0];
//   if (attributes?.length) {
//     return attributes?.length;
//   } else return null;
// });
</script>

<style scoped>

</style>
