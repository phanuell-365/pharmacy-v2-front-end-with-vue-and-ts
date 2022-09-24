<template>
  <section class="add-user">
    <SidebarLayout>
      <template #body>
        <AddUser />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import AddUser from "@/components/app/users/AddUser.vue";
</script>

<style scoped></style>
