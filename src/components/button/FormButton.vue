<template>
  <button :class="buttonSkin" class="btn btn-hover mx-2" type="submit">{{ text }}</button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface FormButtonProps {
  text: string;
  skin: string;
  outline?: boolean;
}

const props = defineProps<FormButtonProps>();

const buttonSkin = computed(
  () => props.outline ? `btn-outline-${props.skin}` : `btn-${props.skin}`
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
