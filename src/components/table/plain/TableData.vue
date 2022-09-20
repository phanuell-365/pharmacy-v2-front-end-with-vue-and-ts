<template>
  <td v-for="fieldName in fieldNames" :key="fieldName">
    {{ record[fieldName] }}
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
