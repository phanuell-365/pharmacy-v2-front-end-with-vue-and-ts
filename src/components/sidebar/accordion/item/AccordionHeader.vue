<template>
  <h2 :id="headingId" class="accordion-header">
    <RouterLink
      :aria-controls="`${aria}`"
      :aria-expanded="ariaExpanded"
      :class="{ 'bg-transparent active-accordion': active }"
      :data-bs-target="`#${aria}`"
      :exact-active-class="activeClass"
      class="accordion-button text-decoration-none bg-success link-light p-2 fs-normal"
      data-bs-toggle="collapse"
      to="#collapseOne"
      type="button"
    >
      <span :class="{ 'active-accordion': active }">
        <FontAwesome :icon-name="icon" class="px-2" />
        {{ startCase(description) }}
      </span>
    </RouterLink>
  </h2>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import startCase from "lodash/startCase";
import FontAwesome from "@/components/icons/FontAwesome.vue";

interface AccordionHeaderProps {
  headerId: string;
  description: string;
  icon: string;
  active?: boolean;
}

const props = defineProps<AccordionHeaderProps>();

const ariaExpanded = computed(() => {
  return props.active ? "true" : "false";
});

const headingId = computed(() => `heading${startCase(props.headerId)}`);

const aria = computed(() => `collapse${startCase(props.headerId)}`);

const activeClass = computed(() => (props.active ? "" : "collapsed"));
</script>

<style scoped>
.active-accordion {
  --my-success: #c0ffc38c;
  color: var(--my-success);
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
</style>
