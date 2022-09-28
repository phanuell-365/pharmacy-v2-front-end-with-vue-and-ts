<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        <ManageUser :update-mode="updateMode" :user-id="userId" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageUser from "@/components/app/users/ManageUser.vue";
import type { Ref } from "vue";
import { ref, watch } from "vue";

interface ManageUserProps {
  userId: string;
  update: boolean;
}

const props = defineProps<ManageUserProps>();

const updateMode: Ref<boolean> = ref(props.update);

watch(
  () => props.update,
  (value) => {
    updateMode.value = value;
  }
);
</script>

<style scoped></style>
