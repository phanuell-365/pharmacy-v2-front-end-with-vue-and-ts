<template>
  <div class="accordion-item bg-success">
    <AccordionHeader
      :active="active"
      :description="accordionHeaderDesc"
      :header-id="accordionHeaderId"
      :icon="accordionIcon"
    />
    <AccordionCollapse
      :accordion-list-items="accordionList"
      :active="active"
      :header-id="accordionHeaderId"
    />
  </div>
</template>

<script lang="ts" setup>
import AccordionHeader from "./item/AccordionHeader.vue";
import AccordionCollapse from "./item/AccordionCollapse.vue";

interface AccordionListItemProps {
  href: string;
  description: string;
  roles?: string[];
}

interface SidebarAccordionItemProps {
  accordionHeaderDesc: string;
  accordionHeaderId: string;
  accordionIcon: string;
  active?: boolean;
  roles?: string[];
  accordionList: AccordionListItemProps[];
}

defineProps<SidebarAccordionItemProps>();
</script>

<style scoped></style>
