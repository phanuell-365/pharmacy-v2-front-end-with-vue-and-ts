<template>
  <section class="container">
    <div class="col">
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink class="text-decoration-none text-light lead fw-bold" to="/">ResTechs Pharmaceuticals</RouterLink>
      </div>
      <hr class="my-2" />
      <SidebarAvatar />
    </div>
    <hr class="my-3" />
    <div class="col">
      <SidebarBody :sidebar-accordions="menu" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import SidebarAvatar from "./SidebarAvatar.vue";
import SidebarBody from "./SidebarBody.vue";

interface AccordionListItemProps {
  href: string;
  description: string;
}

interface SidebarAccordionItemProps {
  accordionHeaderDesc: string;
  accordionHeaderId: string;
  accordionIcon: string;
  accordionList: AccordionListItemProps[];
}

interface SidebarContainerProps {
  menu: SidebarAccordionItemProps[];
}

defineProps<SidebarContainerProps>();
</script>
<style scoped>

</style>
