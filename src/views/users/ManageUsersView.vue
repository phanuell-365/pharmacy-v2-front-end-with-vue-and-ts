<template>
  <section class="manage-users">
    <SidebarLayout>
      <template #body>
        <ManageUsers />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageUsers from "@/components/app/users/ManageUsers.vue";
</script>

<style scoped></style>
