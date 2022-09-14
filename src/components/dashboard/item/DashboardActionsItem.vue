<template>
  <RouterLink :to="href" class="col-2 card border-success p-3 m-3 link-dark text-decoration-none btn-hover bg-light">
    <div class="m-auto text-center">
      <div class="col lead">
        <FontAwesome :icon-name="icon" />
      </div>
      {{ startCase(text) }}
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import FontAwesome from "@/components/icons/FontAwesome.vue";
import startCase from "lodash/startCase";

interface DashboardActionsItemProps {
  icon: string;
  href: string;
  text: string;
}

defineProps<DashboardActionsItemProps>();
</script>

<style scoped>
.btn-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
  color: var(--bs-light) !important;
  background-color: var(--bs-success) !important;
  transition: all 0.2s ease-in;
}

.btn-hover:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>
