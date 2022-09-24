<template>
  <section class="view-user">
    <SidebarLayout>
      <template #body>
        <ViewUser :user-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewUser from "@/components/app/users/ViewUser.vue";

interface ManageUserProps {
  id: string;
}

defineProps<ManageUserProps>();
</script>

<style scoped></style>
