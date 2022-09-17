<template>
  <section class="add-sale">

    <SidebarLayout>
      <template #body>
        <AddSale />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddSale from "@/components/app/sales/AddSale.vue";</script>

<style scoped>

</style>
