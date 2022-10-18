<template>
  <div
    id="dashboardCarousel"
    ref="carousel"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as bootstrap from "bootstrap";

import { onMounted, ref } from "vue";

const carousel = ref();

onMounted(() => {
  const newCarousel = new bootstrap.Carousel(carousel.value);
  newCarousel.next();
});
</script>

<style scoped></style>
