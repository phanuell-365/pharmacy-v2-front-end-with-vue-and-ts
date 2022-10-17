<template>
  <div
    :id="collapseId"
    :aria-labelledby="headingId"
    :class="{ show: active }"
    class="accordion-collapse collapse bg-success"
    data-bs-parent="#sidebarAccordion"
  >
    <div class="accordion-body px-1 py-0">
      <AccordionList :list-items="accordionListItems" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import startCase from "lodash/startCase";
import AccordionList from "./AccordionList.vue";

interface AccordionListItemProps {
  href: string;
  description: string;
  roles?: string[];
}

interface AccordionCollapseProps {
  headerId: string;
  active?: boolean;
  accordionListItems: AccordionListItemProps[];
}

const props = defineProps<AccordionCollapseProps>();

const headingId = computed(() => `heading${startCase(props.headerId)}`);

const collapseId = computed(() => `collapse${startCase(props.headerId)}`);
</script>

<style scoped></style>
