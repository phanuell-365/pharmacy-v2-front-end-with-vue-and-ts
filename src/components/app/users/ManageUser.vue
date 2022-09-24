<template></template>

<script lang="ts" setup>
import { useUsersStore } from "@/stores/app/users/users";
import type { Ref } from "vue";
import { ref } from "vue";
import type { UserDto } from "@/stores/app/users/dto";
import { useRouter } from "vue-router";

interface ManageUserProps {
  userId: string;
}

const router = useRouter();

const props = defineProps<ManageUserProps>();

const usersStore = useUsersStore();

const user: Ref<UserDto | null> = ref(null);

try {
  user.value = await usersStore.fetchUserById(props.userId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "User not found!") {
    router.push(`/errors/users/${props.userId}`);
  }
}
</script>

<style scoped></style>
