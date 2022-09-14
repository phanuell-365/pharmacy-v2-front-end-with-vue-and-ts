<template>
  <RouterLink :to="href" class="dropdown-item">
    <span class="fs-6">{{ text }}</span>
  </RouterLink>
</template>

<script lang="ts" setup>
interface DropdownItemProps {
  text: string;
  href: string;
}

defineProps<DropdownItemProps>();
</script>

<style scoped>

</style>
