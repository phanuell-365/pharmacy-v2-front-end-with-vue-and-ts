<template>
  <div class="col-md-4 col-sm-4 col-lg-4 my-2">
    <label :for="`validation${startCase(inputId)}`" class="form-label fw-bold">
      {{ startCase(inputLabel) }}:
    </label>
    <slot />
    <div class="invalid-feedback">{{ invalidFeedback }}</div>
  </div>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface InputContainerProps {
  inputId: string;
  inputLabel: string;
  invalidFeedback?: string;
}

defineProps<InputContainerProps>();
</script>

<style scoped>

</style>
