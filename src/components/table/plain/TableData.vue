<template>
  <td v-for="fieldName in fieldNames" :key="fieldName" @click="onClickHandler(record)">
    {{ record[fieldName] }}
  </td>
</template>

<script lang="ts" setup>
interface DataProps {
  record: object;
  fieldNames: string[];
}

const props = defineProps<DataProps>();

const emit = defineEmits<{
  (e: "clicked-row", record: object): void
}>();

const onClickHandler = (record: object) => {
  emit("clicked-row", record);
};
</script>

<style scoped>

</style>
