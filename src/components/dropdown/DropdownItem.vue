<template>
  <RouterLink :to="href" class="dropdown-item">
    <span class="fs-6">{{ startCase(text) }}</span>
  </RouterLink>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface DropdownItemProps {
  text: string;
  href: string;
}

defineProps<DropdownItemProps>();
</script>

<style scoped>

</style>
