<template>
  <section class="add-purchase">
    <SidebarLayout>
      <template #body>
        <AddPurchase />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddPurchase from "@/components/app/purchases/AddPurchase.vue";</script>

<style scoped>

</style>
