<template>
  <section class="manage-user">
    <form
      ref="formRef"
      autocomplete="off"
      class="row g-3 m-4"
      novalidate
      @submit.prevent
    >
      <InputContainer
        :invalid-feedback="usernameErrorMessage"
        input-id="username"
        input-label="username"
      >
        <input
          id="validationUsername"
          v-model.trim="username"
          :class="{
            'is-invalid': !usernameMeta.valid && usernameMeta.validated,
          }"
          :disabled="!setUpdateMode && setViewMode"
          class="form-control"
          name="username"
          required
          type="text"
        />
      </InputContainer>

      <InputContainer
        v-if="setUpdateMode"
        :invalid-feedback="passwordErrorMessage"
        input-id="password"
        input-label="password"
      >
        <input
          id="validationPassword"
          v-model.trim="password"
          :class="{
            'is-invalid': !passwordMeta.valid && passwordMeta.validated,
          }"
          class="form-control"
          name="password"
          type="password"
        />
      </InputContainer>

      <InputContainer
        :invalid-feedback="emailErrorMessage"
        input-id="email"
        input-label="email"
      >
        <input
          id="validationEmail"
          v-model.trim="email"
          :class="{ 'is-invalid': !emailMeta.valid && emailMeta.validated }"
          :disabled="!setUpdateMode && setViewMode"
          class="form-control"
          name="email"
          required
          type="email"
        />
      </InputContainer>

      <InputContainer
        :invalid-feedback="roleErrorMessage"
        input-id="role"
        input-label="role"
      >
        <select
          id="validationRole"
          v-model="role"
          :class="{ 'is-invalid': !roleMeta.valid && roleMeta.validated }"
          :disabled="(!setUpdateMode && setViewMode) || setAvatarMode"
          class="form-select"
          name="role"
          required
        >
          <!--        <option :value="role" disabled selected>Please select a role</option>-->
          <option
            v-for="_role in usersRoles"
            :key="_role"
            :selected="role"
            :value="_role"
          >
            {{ startCase(_role) }}
          </option>
        </select>
      </InputContainer>

      <InputContainer
        :invalid-feedback="phoneErrorMessage"
        input-id="phone"
        input-label="phone"
      >
        <input
          id="validationPhone"
          v-model.trim="phone"
          :class="{ 'is-invalid': !phoneMeta.valid && phoneMeta.validated }"
          :disabled="!setUpdateMode && setViewMode"
          class="form-control"
          name="phone"
          required
          type="tel"
        />
      </InputContainer>

      <hr class="my-3" />
      <FormButtonsContainer>
        <FormButton skin="primary" text="Update" @click="onUpdateClick" />
        <template v-if="!setAvatarMode">
          <FormButton skin="secondary" text="Add New" @click="onAddNewClick" />
        </template>
        <FormButton
          v-if="setUpdateMode && !setViewMode"
          outline
          skin="secondary"
          text="View"
          @click="onViewClick"
        />
        <template v-if="!setAvatarMode">
          <FormButton
            outline
            skin="secondary"
            text="View All"
            @click="onViewAllClick"
          />
          <FormButton
            outline
            skin="danger"
            text="Delete"
            @click="onDeleteClick"
          />
        </template>
      </FormButtonsContainer>
    </form>

    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <!--          @on-hidden-bs-toast="onHiddenBsToast"-->
        <!--        />-->

        <LiveToast
          ref="toastWarning"
          skin="warning"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
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
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { TOP_CENTER } from "@/constants/toasts";
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import FormButton from "@/components/button/FormButton.vue";
import InputContainer from "@/components/form/InputContainer.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import DeleteModal from "@/components/modal/delete/DeleteModal.vue";
import startCase from "lodash/startCase";
import { useUsersStore } from "@/stores/app/users/users";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import type { UpdateUserDto, UserDto } from "@/stores/app/users/dto";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import moment from "moment";

interface ManageUserProps {
  userId: string;
  updateMode?: boolean;
  avatarMode?: boolean;
}

const router = useRouter();

const props = defineProps<ManageUserProps>();

const formRef: Ref<HTMLFormElement | null> = ref(null);
const toastSuccess: Ref<InstanceType<LiveToast>> = ref();
const toastWarning: Ref<InstanceType<LiveToast>> = ref();
const toastError: Ref<InstanceType<LiveToast>> = ref();
const deleteModalRef: Ref<InstanceType<DeleteModal> | null> = ref(null);

const usersStore = useUsersStore();

const user: Ref<UserDto | null> = ref(null);
const usersRoles: Ref<string[]> = ref([]);
const setUpdateMode: Ref<boolean | undefined> = ref(props.updateMode);
const setViewMode: Ref<boolean | undefined> = ref(!props.updateMode);
const setAvatarMode: Ref<boolean | undefined> = ref(props.avatarMode);

watch(
  () => props.updateMode,
  (value) => {
    setUpdateMode.value = value;
    setViewMode.value = !value;
  }
);

watch(
  () => props.avatarMode,
  (value) => (setAvatarMode.value = value)
);

try {
  if (setAvatarMode.value)
    usersRoles.value = await usersStore.fetchUsersRoles(false);
  if (!setAvatarMode.value)
    usersRoles.value = await usersStore.fetchUsersRoles(true);
  user.value = await usersStore.fetchUserById(props.userId);
} catch (error: any) {
  console.log(error.message);
  if (error.message === "User not found!") {
    router.push(`/errors/users/${props.userId}`);
  }
}

const usernameValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  return true;
};

const passwordValidation = (value: string) => {
  if (!value) {
    return "This field is required";
  }

  if (value.length < 5) {
    return "The password length may contain 5 characters or more";
  }

  return true;
};

const emailValidation = (value: string) => {
  if (!value) return "This field is required";

  return true;
};

const phoneValidation = (value: string) => {
  if (!value) return "This field is required";

  if (value.length < 10)
    return "The phone number should contain not less than 10 characters";

  if (value.length > 10)
    return "The phone number should contain not more than 10 characters";

  return true;
};

const roleValidation = (value: string) => {
  if (!value) return "This field is required";

  return true;
};

const {
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta,
} = useField("username", usernameValidation);

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField("password", passwordValidation);

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta,
} = useField("email", emailValidation);

const {
  value: phone,
  errorMessage: phoneErrorMessage,
  meta: phoneMeta,
} = useField("phone", phoneValidation);

const {
  value: role,
  errorMessage: roleErrorMessage,
  meta: roleMeta,
} = useField("role", roleValidation);

const validateForm = () => {
  if (
    usernameMeta.valid &&
    passwordMeta.valid &&
    emailMeta.valid &&
    phoneMeta.valid &&
    roleMeta.valid
  )
    return true;
  else {
    toastError.value?.setupToast({
      name: "Add User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add User Error",
      text: "Please fill in the required fields",
      delay: 5000,
    });

    toastError.value?.show();
  }
};

// bind the values to update
username.value = user.value?.username as string;
email.value = user.value?.email as string;
phone.value = user.value?.phone as string;
role.value = user.value?.role as string;

const createUpdateUserPayload = () => {
  const payload: UpdateUserDto = {
    username: username.value,
    password: password.value,
    email: email.value,
    phone: phone.value,
    role: role.value,
  };

  return payload;
};

const updateUser = async (payload: UpdateUserDto) => {
  try {
    const user = await usersStore.updateUser(props.userId, payload);

    toastSuccess.value?.setupToast({
      name: "Update Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Update User",
      text: "Updated the user successfully!",
      delay: 3000,
    });

    toastSuccess.value?.show();

    return user;
  } catch (error: any) {
    console.error(error);

    toastError.value?.setupToast({
      name: "Update User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add Update Error",
      text: "Failed to update the user. " + error?.message,
      delay: 5000,
    });

    toastError.value?.show();
  }
};

const routeRedirect = ref("");

const onUpdateClick = async () => {
  if (setUpdateMode.value && !setViewMode.value) {
    if (validateForm()) await updateUser(createUpdateUserPayload());
  } else {
    setUpdateMode.value = true;
    setViewMode.value = false;
  }
};

const onViewClick = () => {
  setUpdateMode.value = false;
  setViewMode.value = true;
  if (setAvatarMode.value) router.go(0);
};

const onAddNewClick = async () => {
  await router.push("/users/create");
};

const onViewAllClick = async () => {
  await router.push("/users");
};

const onDeleteClick = async () => {
  if (user.value?.role && user.value?.role === "admin") {
    toastError.value?.setupToast({
      name: "Delete User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete User Error",
      text: "Failed to delete user. The user is admin",
      delay: 5000,
    });

    toastError.value?.show();
  } else if (user.value?.role && user.value?.role === "chiefPharmacist") {
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
};

const response: Ref<string | undefined> = ref();

const onDeleteUser = async () => {
  try {
    response.value = await usersStore.deleteUser(props.userId);
    console.log("success");
    toastWarning.value?.setupToast({
      name: "Delete User Success",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Delete User Success",
      text: response.value,
      delay: 5000,
    });

    toastWarning.value?.show();

    deleteModalRef.value.hideModal();

    await router.push("/users");
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
  router.push(routeRedirect.value);
};
</script>

<style scoped></style>
