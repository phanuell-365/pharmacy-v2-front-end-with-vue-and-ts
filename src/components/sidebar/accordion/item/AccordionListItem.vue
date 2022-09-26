<template>
  <li class="w-100">
    <RouterLink
      :to="href"
      active-class="active border rounded bg-light d-block w-100 shadow"
      class="link-light link-hover"
    >
      {{ startCase(description) }}
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface AccordionListItemProps {
  href: string;
  description: string;
}

defineProps<AccordionListItemProps>();
</script>

<style scoped>
.active {
  --my-success: rgba(192, 255, 195, 0.55);
  color: var(--bs-success) !important;
  transform: translateX(5px);
  transition: all 0.3s ease-out;
}

.link-hover:hover {
  /*--my-success: rgba(192, 255, 195, 0.55);
  color: var(--my-success) !important;*/
  transform: translateX(5px);
  /*animation: forwards 0.5s ease-in-out;*/
  transition: all 0.3s ease-out;
}

.active:hover {
  color: var(--bs-success);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

@-webkit-keyframes forwards {
  from {
    transform: translateX(1px);
    opacity: 0.5;
  }
  to {
    transform: translateX(3px);
  }
}

@-o-keyframes forwards {
  from {
    transform: translateX(1px);
    opacity: 0.5;
  }
  to {
    transform: translateX(3px);
  }
}

@-moz-keyframes forwards {
  from {
    transform: translateX(1px);
    opacity: 0.5;
  }
  to {
    transform: translateX(3px);
  }
}

@keyframes forwards {
  from {
    transform: translateX(1px);
    opacity: 0.5;
  }
  to {
    transform: translateX(3px);
  }
}
</style>
