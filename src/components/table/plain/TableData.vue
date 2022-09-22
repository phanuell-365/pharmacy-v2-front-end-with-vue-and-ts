<template>
  <td v-for="fieldName in fieldNames" :key="fieldName">
    <template v-if="record">
      {{ record[fieldName] }}
    </template>
  </td>
</template>

<script lang="ts" setup>
interface DataProps {
  record: object;
  fieldNames: string[];
}

defineProps<DataProps>();
</script>

<style scoped>

</style>
