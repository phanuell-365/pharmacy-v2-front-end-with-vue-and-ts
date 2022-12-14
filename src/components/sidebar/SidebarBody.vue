<template>
  <section>
    <SidebarAccordion open>
      <template
        v-for="accItem in sidebarAccordions"
        :key="accItem.accordionHeaderId"
      >
        <template v-if="accItem?.roles?.includes(loggedInUserRole)">
          <SidebarAccordionItem
            :accordion-header-desc="accItem.accordionHeaderDesc"
            :accordion-header-id="accItem.accordionHeaderId"
            :accordion-icon="accItem.accordionIcon"
            :accordion-list="accItem.accordionList"
            :active="accItem?.active"
            :roles="accItem.roles"
          />
        </template>
      </template>
    </SidebarAccordion>
  </section>
</template>

<script lang="ts" setup>
import SidebarAccordion from "./accordion/SidebarAccordion.vue";
import SidebarAccordionItem from "./accordion/SidebarAccordionItem.vue";
import { useAuthStore } from "@/stores/auth";
import type { Ref } from "vue";
import { ref } from "vue";

const authStore = useAuthStore();

interface AccordionListItemProps {
  href: string;
  description: string;
  roles?: string[];
}

interface SidebarAccordionItemProps {
  accordionHeaderDesc: string;
  accordionHeaderId: string;
  accordionIcon: string;
  roles?: string[];
  accordionList: AccordionListItemProps[];
}

interface SidebarBodyProps {
  sidebarAccordions: SidebarAccordionItemProps[];
}

defineProps<SidebarBodyProps>();

const loggedInUserRole: Ref<string | undefined> = ref(authStore.getUserRole());
</script>
<style scoped>
#sidebarAccordion {
  border-color: var(--bs-success) !important;
  --bs-accordion-border-color: var(--bs-success);
}

.dropdown-toggle {
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
  border: 0;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, 0.85);
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

.link-hover:hover {
  --my-success: rgba(192, 255, 195, 0.55);
  color: var(--my-success) !important;
}

.accordion-button:not(.collapsed)::after {
  color: gray;
}

.accordion-button:focus {
  z-index: 3;
  border-color: var(--bs-light);
  outline: 0;
  box-shadow: 0 0 0 0.25rem var(--bs-success);
}

.accordion-button:not(.collapsed)::after {
  --my-success: #c0ffc38c;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23C0FFC38C'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  /*background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' fill='%23fff'%3e%3cpath fill-rule='lessthan' d='M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z'/%3e%3c/svg%3e");*/
  transform: rotate(0deg);
  color: var(--my-success);
}

.accordion-button::after {
  flex-shrink: 0;
  width: var(--bs-accordion-btn-icon-width);
  height: var(--bs-accordion-btn-icon-width);
  margin-left: auto;
  content: "";
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: var(--bs-accordion-btn-icon-width);
  transform: rotate(90deg);
  transition: var(--bs-accordion-btn-icon-transition);
}

.active {
  --my-success: rgba(192, 255, 195, 0.55);
  color: var(--bs-teal) !important;
}
</style>
