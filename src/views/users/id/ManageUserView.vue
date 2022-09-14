<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        Update {{ id }}
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";

interface ManageUserProps {
  id: string;
}

defineProps<ManageUserProps>();
</script>

<style scoped>

</style>
