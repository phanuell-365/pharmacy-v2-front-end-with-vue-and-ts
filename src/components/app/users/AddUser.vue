<template>
  <section class="add-user">
    <form class="row g-3 m-4" novalidate @submit.prevent="onFormSubmitHandler">
      <InputContainer
        input-id="username"
        input-label="username"
        invalid-feedback="Please enter a username"
      >
        <input
          id="validationUsername"
          v-model.trim="username"
          class="form-control"
          name="username"
          required
          type="text"
        />
      </InputContainer>

      <div class="col-md-4">
        <label class="form-label" for="validationPassword">Password</label>

        <input
          id="validationPassword"
          v-model.trim="password"
          class="form-control"
          name="password"
          required
          type="password"
        />
        <div class="invalid-feedback">Please enter a password</div>
      </div>

      <div class="col-md-4">
        <label class="form-label" for="validationEmail">Email</label>
        <input
          id="validationEmail"
          v-model.trim="email"
          class="form-control"
          name="email"
          required
          type="email"
        />
        <div class="invalid-feedback">Please enter a email</div>
      </div>

      <div class="col-md-4">
        <label class="form-label" for="validationRole">Role</label>
        <select
          id="validationRole"
          v-model.trim="role"
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
        <div class="invalid-feedback">Please select a role</div>
      </div>

      <div class="col-md-4">
        <label class="form-label" for="validationPhone">Phone</label>
        <input
          id="validationPhone"
          v-model.trim="phone"
          class="form-control"
          name="phone"
          required
          type="tel"
        />
        <div class="invalid-feedback">Please enter a phone</div>
      </div>

      <hr class="my-3" />
      <FormButtonsContainer>
        <FormButton skin="success" text="add" />
        <FormButton skin="dark" text="add & new" />
        <FormButton outline skin="dark" text="add & view" />
        <FormButton outline skin="danger" text="clear" />
      </FormButtonsContainer>
    </form>

    <Teleport to="body">
      <ToastContainer :placement="TOP_CENTER">
        <LiveToast ref="toastSuccess" skin="info" />
        <LiveToast ref="toastError" skin="danger" />
      </ToastContainer>
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
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useUsersStore } from "@/stores/app/users/users";
import moment from "moment";
import type { NewUserDto } from "@/stores/app/users/dto";
import { useGetFormElement } from "@/composables/get-form-element";
import startCase from "lodash/startCase";
import { useGetClickedButton } from "@/composables/get-clicked-button";

const toastSuccess = ref();
const toastError = ref();

const usersStore = useUsersStore();

const usersRoles: Ref<string[]> = ref([]);

onMounted(async () => {
  try {
    usersRoles.value = await usersStore.fetchUsersRoles();
  } catch (error: any) {
    toastError.value?.setupToast({
      name: "Roles Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Fetch Roles Error",
      text: "Failed to fetch roles from the server",
      delay: 5000,
    });

    toastError.value?.show();
  }
});

const username: Ref<NewUserDto["username"] | undefined> = ref();
const password: Ref<NewUserDto["password"] | undefined> = ref();
const email: Ref<NewUserDto["email"] | undefined> = ref();
const phone: Ref<NewUserDto["phone"] | undefined> = ref();
const role: Ref<NewUserDto["role"] | undefined> = ref(usersRoles.value[0]);

const onFormSubmitHandler = async (event: Event) => {
  const form = event.target as HTMLFormElement;

  // determine which button was clicked
  const clickedButton = useGetClickedButton(form);

  console.log(clickedButton.value);

  const payload: NewUserDto = {
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "",
  };

  // (() => {
  const usernameEl = useGetFormElement(form, "input", "username")
    .value as HTMLInputElement;

  if (!username.value) {
    usernameEl.classList.add("is-invalid");
  } else {
    usernameEl.classList.remove("is-invalid");
    payload.username = username.value;
  }

  const passwordEl = useGetFormElement(form, "input", "password")
    .value as HTMLInputElement;

  if (!password.value) {
    passwordEl.classList.add("is-invalid");
  } else {
    passwordEl.classList.remove("is-invalid");
    payload.password = password.value;
  }

  const emailEl = useGetFormElement(form, "input", "email")
    .value as HTMLInputElement;

  if (!email.value) {
    emailEl.classList.add("is-invalid");
  } else {
    emailEl.classList.remove("is-invalid");
    payload.email = email.value as string;
  }

  const roleEl = useGetFormElement(form, "select", "role")
    .value as HTMLSelectElement;

  if (!role.value) {
    roleEl.classList.add("is-invalid");
  } else {
    roleEl.classList.remove("is-invalid");
    payload.role = role.value as string;
  }

  const phoneEl = useGetFormElement(form, "input", "phone")
    .value as HTMLInputElement;

  if (!phone.value) {
    phoneEl.classList.add("is-invalid");
  } else {
    phoneEl.classList.remove("is-invalid");
    payload.phone = phone.value as string;
  }
  // })();

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const values = Object.values(payload);

    const valid = values.every((value: string) => value !== "");

    if (valid) {
      const success = await usersStore.addUser({ ...payload });

      if (success.status) {
        toastSuccess.value?.setupToast({
          name: "Add Success",
          elapsedDuration: moment().startOf("second").fromNow(),
          heading: "Add User",
          text: "Added the user successfully!",
          delay: 3000,
        });

        toastSuccess.value?.show();
      }
    }
  } catch (e: any) {
    console.error(e);

    toastError.value?.setupToast({
      name: "Add User Error",
      elapsedDuration: moment().startOf("second").fromNow(),
      heading: "Add user error!",
      text: `An error occurred. ${e.message}`,
      delay: 5000,
    });

    toastError.value?.show();
  }
};
</script>

<style scoped>
.btn-hover:hover {
  transform: translateY(-3px);
  /*box-shadow: var(--bs-card-box-shadow);*/
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in;
}

.btn-hover:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>
