<template>
  <div
    :id="`modal${name}`"
    ref="logoutModalRef"
    aria-hidden="true"
    class="modal fade modal-alert py-5"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-body p-4 text-center">
          <h5 class="mb-0">Are you sure you want to log out ?</h5>
          <p class="mb-0">You will need to login again.</p>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button
            class="btn btn-lg btn-link text-danger fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
            type="button"
            @click="onLogoutClick"
          >
            <strong>Yes, log out</strong>
          </button>
          <button
            class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
            data-bs-dismiss="modal"
            type="button"
            @click="onCloseClick"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

interface LogoutModalProps {
  name: string;
  to?: string | "current";
}

const props = defineProps<LogoutModalProps>();

const href = computed(() => (props.to ? props.to : "/"));

const logoutModalRef = ref();

const authStore = useAuthStore();

const router = useRouter();

const logoutModal = ref();

onMounted(() => {
  logoutModal.value = new Modal(logoutModalRef.value);
});

defineExpose({
  showModal: () => logoutModal.value.show(),
});

const onLogoutClick = () => {
  authStore.logout();
  logoutModal.value?.hide();
  if (href.value === "current") router.go(0);
  else if (href.value) router.push(href.value);
};

const onCloseClick = () => {
  logoutModal.value?.hide();
  // router.go(0);
};

// onBeforeMount(() => useCleanUpModal());
</script>

<style scoped>
/*.fade:not(.show) {
  opacity: 1 !important;
}
*/
.rounded-4 {
  border-radius: 0.5rem;
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

.border-right {
  border-right: 1px solid #eee;
}

.modal-tour .modal-dialog {
  width: 380px;
}
</style>
