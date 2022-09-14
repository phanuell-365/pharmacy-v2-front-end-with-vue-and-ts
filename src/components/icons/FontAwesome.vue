<template>
  <i :class="iconName"></i>
</template>

<script lang="ts" setup>
interface FontAwesomeProps {
  iconName: string;
}

defineProps<FontAwesomeProps>();
</script>

<style scoped></style>
