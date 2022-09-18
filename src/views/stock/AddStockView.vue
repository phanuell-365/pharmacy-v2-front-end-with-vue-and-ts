<template>
  <section class="add-stock">
    <SidebarLayout>
      <template #body>
        <AddStock />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddStock from "@/components/app/stocks/AddStock.vue";</script>

<style scoped>

</style>
