<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        <ManageUser :user-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageUser from "@/components/app/users/ManageUser.vue";

interface ManageUserProps {
  id: string;
}

defineProps<ManageUserProps>();
</script>

<style scoped></style>
