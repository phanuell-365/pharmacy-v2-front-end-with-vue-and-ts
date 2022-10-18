<template>
  <div
    id="modalSignin"
    ref="theModal"
    aria-hidden="true"
    class="modal fade modal-signin py-5"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-5 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h2 class="fw-bold mb-0">Please Login</h2>
        </div>

        <div class="modal-body p-5 pt-0">
          <form
            autocomplete="off"
            class=""
            novalidate
            @submit.prevent="onFormSubmit"
          >
            <div class="form-floating mb-3">
              <input
                id="floatingInput"
                ref="refUsername"
                v-model="username"
                autofocus="autofocus"
                class="form-control rounded-4"
                placeholder="John Doe"
                required
                type="text"
                @blur="onUsernameBlur"
              />
              <label for="floatingInput">Username</label>
              <div class="invalid-feedback">{{ usernameInvalidFeedback }}</div>
            </div>
            <div class="form-floating mb-3">
              <input
                id="floatingPassword"
                ref="refPassword"
                v-model="password"
                class="form-control rounded-4"
                placeholder="Password"
                required
                type="password"
                @blur="onPasswordBlur"
              />
              <label for="floatingPassword">Password</label>
              <div class="invalid-feedback">{{ passwordInvalidFeedback }}</div>
            </div>
            <button
              class="w-100 mb-2 btn btn-lg rounded-4 btn-success"
              type="submit"
            >
              Log in
            </button>
            <button
              class="w-100 mb-2 btn btn-lg rounded-4 btn-danger"
              type="submit"
              @click="onCloseModalClick"
            >
              Cancel
            </button>
            <hr class="my-3" />
            <small class="text-muted">Please log in to continue</small>
          </form>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ToastContainer :placement="TOP_RIGHT">
        <LiveToast
          ref="toastOk"
          skin="ok"
          @on-hidden-bs-toast="onHiddenBsToast"
        />
      </ToastContainer>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import ToastContainer from "@/components/toast/ToastContainer.vue";
import LiveToast from "@/components/toast/LiveToast.vue";
import { TOP_RIGHT } from "@/constants/toasts";
import moment from "moment";
import type { Ref } from "vue";
import { onBeforeMount, onMounted, ref } from "vue";
import * as bootstrap from "bootstrap";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import startCase from "lodash/startCase";

const authStore = useAuthStore();

const toastOk: Ref<InstanceType<LiveToast>> = ref();

const theModal = ref();

const router = useRouter();

const emit = defineEmits(["show-modal"]);

const modal = ref();

onMounted(() => {
  modal.value = new bootstrap.Modal(theModal.value);
  modal.value?.show();
  emit("show-modal");
});

defineExpose({
  modal,
});

const username = ref("");
const password = ref("");

const refUsername = ref();
const refPassword = ref();

const usernameInvalidFeedback = ref("Please enter a username");
const passwordInvalidFeedback = ref("Please enter a password");

const onUsernameBlur = () => {
  const usernameEl = refUsername.value as HTMLInputElement;
  if (!username.value) {
    usernameEl.classList.add("is-invalid");
  } else {
    usernameEl.classList.remove("is-invalid");
  }
};

const onPasswordBlur = () => {
  const passwordEl = refPassword.value as HTMLInputElement;

  if (!password.value) {
    passwordEl.classList.add("is-invalid");
  } else {
    passwordEl.classList.remove("is-invalid");
  }
};

const onFormSubmit = async () => {
  const usernameEl = refUsername.value as HTMLInputElement;
  if (!username.value) {
    usernameEl.classList.add("is-invalid");
  } else {
    usernameEl.classList.remove("is-invalid");
  }

  const passwordEl = refPassword.value as HTMLInputElement;

  if (!password.value) {
    passwordEl.classList.add("is-invalid");
  } else {
    passwordEl.classList.remove("is-invalid");
  }

  if (password.value && username.value) {
    try {
      await authStore.login({
        username: username.value,
        password: password.value,
      });

      modal.value?.hide();
      // router.go(0);

      toastOk.value?.setupToast({
        name: "Log In Success",
        elapsedDuration: moment().startOf("second").fromNow(),
        heading: "Log In Success!",
        text: `Welcome back ${startCase(username.value)}`,
        delay: 3000,
      });

      toastOk.value?.show();
    } catch (error: any) {
      console.error(error);

      usernameEl.classList.add("is-invalid");
      usernameInvalidFeedback.value = "Invalid username or password";
      // usernameInvalidFeedback.value = error.message;

      passwordEl.classList.add("is-invalid");
      passwordInvalidFeedback.value = "Invalid username or password";
      // passwordInvalidFeedback.value = error.message;
    }
  }
};

const onHiddenBsToast = () => {
  router.go(0);
};

const onCloseModalClick = () => {
  modal.value?.hide();
  router.back();
};

onBeforeMount(() => {
  const modalBackDrops = document.body.getElementsByClassName("modal-backdrop");

  for (let modal = 0; modal < modalBackDrops.length; modal++) {
    const modalEl = modalBackDrops[modal];
    document.body.removeChild(modalEl);
  }
});
</script>

<style scoped>
.rounded-4 {
  border-radius: 0.5rem;
}

.rounded-5 {
  border-radius: 0.75rem;
}

.modal-sheet .modal-dialog {
  width: 380px;
  transition: bottom 0.75s ease-in-out;
}

.modal-sheet .modal-footer {
  padding-bottom: 2rem;
}

.modal-alert .modal-dialog {
  width: 380px;
}

.modal-tour .modal-dialog {
  width: 380px;
}
</style>
