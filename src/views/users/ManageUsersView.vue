<template>
  <section class="manage-users">
    <SidebarLayout>
      <template #body>
        <TablePlaceholders />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>import SidebarLayout from "@/layouts/SidebarLayout.vue";
import TablePlaceholders from "@/components/placeholders/TablePlaceholders.vue";</script>

<style scoped>

</style>
