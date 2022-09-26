<template>
  <div class="form-check form-switch p-1" @click="onLogoutClick">
    <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">
      <span class="text-content">
        {{ textContent }}
      </span>
    </label>
    <input
      id="flexSwitchCheckCheckedDisabled"
      ref="switchInput"
      :checked="status"
      :class="{
        'status-active': status,
        'status-inactive text-danger': !status,
      }"
      class="form-check-input"
      disabled
      role="switch"
      type="checkbox"
    />
  </div>
  <Teleport to="body">
    <!--    <Transition>-->
    <!--      <template v-if="logout">-->
    <LogoutModal :key="`loginStatus`" ref="logoutModalRef" name="loginStatus" />
    <!--      </template>-->
    <!--    </Transition>-->
  </Teleport>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import LogoutModal from "@/components/modal/logout/LogoutModal.vue";

const authStore = useAuthStore();

interface LoginStatusProps {
  active?: boolean;
}

const props = defineProps<LoginStatusProps>();

const logoutModalRef: Ref<InstanceType<LogoutModal | null>> = ref(null);

const status = ref(authStore.isLoggedIn());

const logout = ref(false);

const textContent = computed(() =>
  !status.value ? "Logged Out" : "Logged In"
);

const switchInput = ref();

const onLogoutClick = () => {
  // logout.value = true;
  logoutModalRef.value?.showModal();
};
</script>

<style scoped>
.status-active {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
}

.status-active:disabled {
  opacity: 1;
}

.status-inactive {
  background-color: var(--bs-light);
  border-color: var(--bs-danger);
}

.status-inactive:disabled {
  opacity: 1;
}

span.text-content,
input[disabled],
span.text-content {
  opacity: 1 !important;
}

.form-check-input:disabled ~ .form-check-label,
.form-check-input[disabled] ~ .form-check-label {
  opacity: 1 !important;
}

.v-enter-from {
  opacity: 0;
  transform: scale(1);
}

.v-enter-active {
  opacity: 0.5;
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: scale(-1);
}
</style>
