<template>
  <section class="place-an-order">
    <SidebarLayout>
      <template #body>
        <PlaceAnOrder />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import PlaceAnOrder from "@/components/app/medicines/PlaceAnOrder.vue";
</script>

<style scoped></style>
