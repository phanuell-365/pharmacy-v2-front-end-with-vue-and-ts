<template>
  <div class="form-check form-check-inline">
    <input :id="`inline${startCase(name)}`" :name="`inlineRadio${startCase(name)}`" :value="modelValue"
           class="form-check-input" type="radio"
           @change="$emit('update:modelValue', $event.target.value)">
    <label class="form-check-label" for="inlineRadio1">{{ startCase(text) }}</label>
  </div>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";

interface FormRadioProps {
  name: string;
  text: string;
  modelValue?: string;
}

defineProps<FormRadioProps>();

defineEmits(["update:modelValue"]);
</script>

<style scoped>

</style>
