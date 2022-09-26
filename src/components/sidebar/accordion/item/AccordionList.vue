<template>
  <ul
    class="btn-toggle-nav list-unstyled fw-normal pb-1 small d-flex flex-column align-items-start"
  >
    <AccordionListItem
      v-for="item in listItems"
      :key="item.description"
      :description="item.description"
      :href="item.href"
    />
  </ul>
</template>

<script lang="ts" setup>
import AccordionListItem from "./AccordionListItem.vue";

interface AccordionListItemProps {
  href: string;
  description: string;
}

interface AccordionListProps {
  listItems: AccordionListItemProps[];
}

defineProps<AccordionListProps>();
</script>

<style scoped>
.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
</style>
