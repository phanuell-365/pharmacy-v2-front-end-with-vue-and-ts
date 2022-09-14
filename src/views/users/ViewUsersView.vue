<template>
  <section class="view-users">
    <SidebarLayout>
      <template #body>
        <TablePlaceholders />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import TablePlaceholders from "@/components/placeholders/TablePlaceholders.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";</script>

<style scoped>

</style>
