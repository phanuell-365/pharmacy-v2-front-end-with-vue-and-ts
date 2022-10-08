<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #entity-title>
        <span class="text-start fw-bold fs-5 mx-3">
          Manage {{ user?.username }}
        </span>
      </template>
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
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/stores/app/users/users";
import type { UserDto } from "@/stores/app/users/dto";

interface ManageUserProps {
  userId: string;
  update: boolean;
}

const router = useRouter();

const props = defineProps<ManageUserProps>();

const usersStore = useUsersStore();

const user: Ref<UserDto | undefined> = ref();

const updateMode: Ref<boolean> = ref(props.update);

onMounted(async () => {
  try {
    user.value = await usersStore.fetchUserById(props.userId);
  } catch (error: any) {
    console.log(error.message);

    if (error.message === "User not found!") {
      await router.push(`/errors/users/${props.userId}`);
    }
  }
});

watch(
  () => props.update,
  (value) => {
    updateMode.value = value;
  }
);
</script>

<style scoped></style>
