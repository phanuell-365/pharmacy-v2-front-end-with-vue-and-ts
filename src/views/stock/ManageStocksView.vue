<template>
  <section class="manage-stocks">
    <SidebarLayout>
      <template #body>
        <ManageStocks />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageStocks from "@/components/app/stocks/ManageStocks.vue";</script>

<style scoped>

</style>
