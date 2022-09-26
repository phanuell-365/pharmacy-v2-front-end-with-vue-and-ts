<template>
  <div class="d-flex justify-content-evenly">
    <div class="flex-row m-2">
      <RouterLink
        :to="`/users/${user?.id}`"
        class="text-decoration-none avatar-cover border border-light d-flex justify-content-center"
      >
        <FontAwesome :icon-name="USER_ICON" />
      </RouterLink>
    </div>
    <div class="flex-row m-2">
      <div class="d-flex flex-column">
        <div class="flex-fill">
          <span class="fs-6 fw-lighter text-gray-400">Welcome</span>
        </div>
        <div class="flex-fill">
          <DropdownContainer :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { USER_ICON } from "@/constants/icons";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import DropdownContainer from "@/components/dropdown/DropdownContainer.vue";
import { useUsersStore } from "@/stores/app/users/users";
import { useAuthStore } from "@/stores/auth";
import type { UserDto } from "@/stores/app/users/dto";
import type { Ref } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const usersStore = useUsersStore();
const authStore = useAuthStore();

const router = useRouter();

const user: Ref<UserDto | undefined> = ref();

const userId: Ref<string | undefined> = ref(authStore.getLoggedInUserId());

// onBeforeMount(
//   async () => {

try {
  if (userId.value) user.value = await usersStore.fetchUserById(userId.value);
} catch (error: any) {
  console.error(error);
  // if (error.message === "Unauthorized")
  //   router.go(0);
}
//
//   }
// );
</script>

<style scoped>
.avatar-cover {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-items: center;
  text-align: center;
  color: var(--bs-light);
}

.avatar-cover:hover {
  color: var(--bs-success);
  background-color: var(--bs-light);
}

.text-gray-400 {
  color: var(--bs-gray-400);
}
</style>
