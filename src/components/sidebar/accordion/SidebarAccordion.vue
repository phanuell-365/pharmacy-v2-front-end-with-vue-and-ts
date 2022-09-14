<template>
  <div id="sidebarAccordion" :class="{open}" class="accordion border border-success">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface SidebarAccordionProps {
  open?: boolean;
}

defineProps<SidebarAccordionProps>();
</script>

<style scoped>
#sidebarAccordion {
  border-color: var(--bs-success) !important;
  --bs-accordion-border-color: var(--bs-success);
}
</style>
