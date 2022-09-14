<template>
  <div :class="{active}" :data-bs-interval="dataBsInterval" class="carousel-item">
    <div class="row justify-content-evenly p-1">
      <slot/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {computed} from "vue";

interface DashboardCarouselCardProps {
  interval?: number;
  active?: boolean;
}

const props = defineProps<DashboardCarouselCardProps>()

const dataBsInterval = computed(
    () => props.interval ? props.interval : 4000
)
</script>
<style scoped>

</style>
