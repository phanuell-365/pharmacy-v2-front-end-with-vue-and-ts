<template>
  <RouterLink :class="skin" :to="href" class="btn btn-sm btn-hover mx-1 rounded">
    <FontAwesome :icon-name="iconName" />
  </RouterLink>
</template>

<script lang="ts" setup>
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { computed } from "vue";
import { DELETE_ICON, UPDATE_ICON, VIEW_ICON } from "@/constants/icons";

interface ButtonLinkIconProps {
  href: string;
  action: "update" | "view" | "delete";
}

const props = defineProps<ButtonLinkIconProps>();

const iconName = computed(
  () => {
    switch (props.action) {
      case "update":
        return UPDATE_ICON;
      case "view":
        return VIEW_ICON;
      case "delete":
        return DELETE_ICON;
    }
  }
);

const skin = computed(
  () => {
    switch (props.action) {
      case "update":
        return "btn-secondary";
      case "view":
        return "btn-success";
      case "delete":
        return "btn-danger";
    }
  }
);
</script>

<style scoped>
.btn-hover:hover {
  transform: translateY(-3px);
  /*box-shadow: var(--bs-card-box-shadow);*/
  box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
  transition: all 0.2s ease-in;
}

.btn-hover:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>
