<template>
  <section class="manage-medicines">
    <SidebarLayout>
      <template #body>
        <ManageMedicines />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageMedicines from "@/components/app/medicines/ManageMedicines.vue";</script>

<style scoped>

</style>
