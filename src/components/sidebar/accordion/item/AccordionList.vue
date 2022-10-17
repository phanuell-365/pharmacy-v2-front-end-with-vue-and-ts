<template>
  <ul
    class="btn-toggle-nav list-unstyled fw-normal pb-1 small d-flex flex-column align-items-start"
  >
    <template v-for="item in listItems" :key="item.description">
      <template v-if="item?.roles?.includes(loggedInUserRole)">
        <AccordionListItem :description="item.description" :href="item.href" />
      </template>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import AccordionListItem from "./AccordionListItem.vue";
import { useAuthStore } from "@/stores/auth";
import type { Ref } from "vue";
import { ref } from "vue";

const authStore = useAuthStore();

interface AccordionListItemProps {
  href: string;
  description: string;
  roles?: string[];
}

interface AccordionListProps {
  listItems: AccordionListItemProps[];
}

defineProps<AccordionListProps>();

const loggedInUserRole: Ref<string | undefined> = ref(authStore.getUserRole());
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
