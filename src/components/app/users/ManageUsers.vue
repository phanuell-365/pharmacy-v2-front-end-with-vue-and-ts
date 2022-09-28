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
        <ButtonIcon
          :icon-name="DELETE_ICON"
          class="mx-1"
          skin="danger"
          @click="onDeleteClick(recordId)"
        />
        <Teleport to="body">
          <DeleteModal ref="deleteModalRef" name="delete-user">
            <template #buttons>
              <button
                class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
                data-bs-dismiss="modal"
                type="button"
                @click="onDeleteUser"
              >
                <strong>Yes</strong>
              </button>
              <button
                class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
                data-bs-dismiss="modal"
                type="button"
              >
                Cancel
              </button>
            </template>
          </DeleteModal>
          <ToastContainer :placement="TOP_CENTER">
            <LiveToast
              ref="toastWarning"
              skin="warning"
              @on-hidden-bs-toast="onHiddenBsToast"
            />
            <LiveToast ref="toastSuccess" skin="info" />
            <LiveToast ref="toastError" skin="danger" />
          </ToastContainer>
        </Teleport>
      </template>
    </SearchTable>
  </section>
</template>

<script lang="ts" setup>
import SearchTable from "@/components/table/search/SearchableTable.vue";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import ButtonLinkIcon from "@/components/button/ButtonLinkIcon.vue";
import ButtonIcon from "@/components/button/ButtonIcon.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import { TOP_CENTER } from "@/constants/toasts";
import { DELETE_ICON } from "@/constants/icons";
import { useUsersStore } from "@/stores/app/users/users";
import type { Ref } from "vue";
import { ref } from "vue";
import type { UserDto } from "@/stores/app/users/dto";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const usersStore = useUsersStore();

const users: Ref<UserDto[] | undefined> = ref();

const toastSuccess = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

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

const selectedUser: Ref<UserDto | null> = ref(null);

const onDeleteClick = async (recordId: string) => {
  try {
    selectedUser.value = await usersStore.fetchUserById(recordId);

    if (selectedUser.value?.role && selectedUser.value?.role === "admin") {
      toastError.value?.setupToast({
        name: "Delete User Error",
        elapsedDuration: moment().startOf("second").fromNow(),
        heading: "Delete User Error",
        text: "Failed to delete user. The user is admin",
        delay: 5000,
      });

      toastError.value?.show();
    } else if (
      selectedUser.value?.role &&
      selectedUser.value?.role === "chiefPharmacist"
    ) {
      toastError.value?.setupToast({
        name: "Delete User Error",
        elapsedDuration: moment().startOf("second").fromNow(),
        heading: "Delete User Error",
        text: "Failed to delete. The user is a chiefPharmacist",
        delay: 5000,
      });

      toastError.value?.show();
    } else {
      deleteModalRef.value.setUpModal({
        secondaryHeader: "Are you sure you want to delete this user?",
        primaryHeader: "Click yes to delete and cancel to exit.",
      });

      deleteModalRef.value.showModal();
    }
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Fetch User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch User Error",
      text: "Failed to fetch user from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const response: Ref<string | undefined> = ref();

const onDeleteUser = async () => {
  try {
    response.value = await usersStore.deleteUser(
      selectedUser.value?.id as string
    );

    toastWarning.value?.setupToast({
      name: "Delete User Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete User Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    users.value = await usersStore.fetchUsers();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Delete User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete User Error",
      text: error.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const onHiddenBsToast = () => {
  router.go(0);
};
</script>

<style scoped></style>
