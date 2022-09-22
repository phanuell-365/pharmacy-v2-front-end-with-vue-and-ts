<template>
  <RouterLink :class="skin" :to="href" class="btn btn-sm btn-hover mx-1 rounded">
    <p class="fs-6 lead mb-0">{{ text }}</p>
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface ButtonLinkProps {
  href: string;
  text: string;
  action: "update" | "view" | "delete" | "add";
}

const props = defineProps<ButtonLinkProps>();

const skin = computed(
  () => {
    switch (props.action) {
      case "update":
        return "btn-secondary";
      case "view":
      case "add":
        return "btn-success";
      case "delete":
        return "btn-danger";
    }
  }
);
</script>

<style scoped>

</style>
