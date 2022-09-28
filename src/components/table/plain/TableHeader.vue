<template>
  <th>#</th>
  <th
    v-for="fieldName in fieldNames"
    :key="fieldName"
    :scope="scope"
    class="small text-wrap word-wrap"
  >
    {{ startCase(fieldName) }}
  </th>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface HeaderProps {
  scope: string;
  fieldNames: string[];
}

defineProps<HeaderProps>();
</script>

<style scoped>
.word-wrap {
  word-break: break-word;
}
</style>
