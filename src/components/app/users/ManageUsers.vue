<template>
  <section class="manage-users">
    <SearchTable
      :attributes="usersStore.getUserAttributes"
      :records="users"
      name="user"
      null-comment="User not found"
      search-by="username"
      search-term="user"
    >
      <template #actions="{ recordId }">
        <ButtonLinkIcon :href="`/users/${recordId}`" action="view" />
        <ButtonLinkIcon
          :href="`/users/${recordId}?update=true`"
          action="update"
        />
        <ButtonLinkIcon :href="`/users/${recordId}`" action="delete" />
      </template>
    </SearchTable>
    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { useUsersStore } from "@/stores/app/users/users";
import type { Ref } from "vue";
import { ref } from "vue";
import type { UserDto } from "@/stores/app/users/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const usersStore = useUsersStore();

const users: Ref<UserDto[] | undefined> = ref();

const formRef = ref();
const toastSuccess = ref();
const toastError = ref();

try {
  users.value = await usersStore.fetchUsers();
} catch (error: any) {
  console.error(error);

  if (error.message === "Forbidden resource") {
    router.push({
      name: "un-authorized",
      params: { action: "manage-customer" },
    });
  }

  toastError.value?.setupToast({
    name: "Fetch Users Error",
    elapsedDuration: moment().startOf("second").fromNow(),
    heading: "Fetch Users Error",
    text: "Failed to fetch users from the server",
    delay: 5000,
  });

  toastError.value?.show();
}
</script>

<style scoped></style>
