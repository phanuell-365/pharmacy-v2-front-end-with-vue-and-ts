<template>
  <h5 :class="{'text-success': value >500, 'text-dark': value <= 300 && value >10 , 'text-danger': value <= 10}"
      class="lead fs-3">
    {{ value }}
  </h5>
</template>

<script lang="ts" setup>
import {computed} from "vue";

interface CardTotalValueProps {
  totalValue?: number;
}

const props = defineProps<CardTotalValueProps>()

const value = computed(
    () => props.totalValue ? props.totalValue : 10
)
</script>

<style scoped>

</style>
