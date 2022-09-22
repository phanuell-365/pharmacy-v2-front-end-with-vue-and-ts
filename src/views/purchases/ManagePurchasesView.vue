<template>
  <section class="manage-purchases">
    <SidebarLayout>
      <template #body>
        <ManagePurchases />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManagePurchases from "@/components/app/purchases/ManagePurchases.vue";</script>

<style scoped>

</style>
