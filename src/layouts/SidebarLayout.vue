<template>
  <section>
    <aside class="d-flex flex-column flex-shrink-0 p-3 text-white">
      <SidebarContainer :menu="menu" />
    </aside>
    <main>
      <!--      <div class="row mx-2 align-items-center">-->
      <!--        <div class="col-6">-->
      <!--          <p class="fw-bold text-muted mb-0 lead">-->
      <!--            {{ startCase(sidebarStore.getSidebarMenuName) }}-->
      <!--          </p>-->
      <!--        </div>-->
      <!--        <div class="col-6 d-flex justify-content-end">-->
      <!--          <LoginStatus />-->
      <!--        </div>-->

      <!--      </div>-->
      <div
        class="d-flex align-items-center text-success justify-content-between mb-2"
      >
        <slot name="entity-title">
          <span
            v-if="
              sidebarStore.sidebarSubMenu?.description === 'dashboard' &&
              loggedInUserRole
            "
            class="text-start fw-bold fs-5 mx-3"
          >
            {{ startCase(loggedInUserRole) }}'s
            {{ startCase(sidebarStore.sidebarSubMenu?.description) }}</span
          >
          <span v-else class="text-start fw-bold fs-5 mx-3">
            {{ startCase(sidebarStore.sidebarSubMenu?.description) }}</span
          >
        </slot>
        <div class="logout-button">
          <Teleport to="body">
            <LogoutModal
              :key="`loginStatus`"
              ref="logoutModalRef"
              name="loginStatus"
            />
          </Teleport>
          <FontAwesome
            :icon-name="LOGOUT_ICON"
            class="text-success fa-lg mx-4 py-3 px-2 shadow-sm rounded bg-white btn-hover"
            @click="onLogoutClick"
          />
        </div>
      </div>
      <CardLayout name="card">
        <template #body>
          <slot name="body" />
        </template>
        <template #footer>
          <slot name="footer" />
        </template>
      </CardLayout>
    </main>
    <Teleport to="body">
      <template v-if="!isLoggedIn">
        <LoginModal ref="loginModal" />
      </template>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import CardLayout from "./CardLayout.vue";
// import LoginStatus from "@/components/LoginStatus.vue";
import LoginModal from "@/components/modal/login/LoginModal.vue";
import LogoutModal from "@/components/modal/logout/LogoutModal.vue";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import SidebarContainer from "@/components/sidebar/SidebarContainer.vue";
import { useAuthStore } from "@/stores/auth";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useCleanUpModal } from "@/composables/clean-up-modal";
import type { Ref } from "vue";
import { ref } from "vue";
import { menu } from "@/constants/sidebar";
import { useSidebarStore } from "@/stores/sidebar/sidebar";
import startCase from "lodash/startCase";
import { LOGOUT_ICON } from "@/constants/icons";

const loginModal = ref();

const logoutModalRef: Ref<InstanceType<LogoutModal | null>> = ref(null);

const route = useRoute();

const routeName = route.name as string;

const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

sidebarStore.setUpSidebarMenu(routeName);

const isLoggedIn = authStore.isLoggedIn();

const onLogoutClick = () => {
  logoutModalRef.value?.showModal();
};

const loggedInUserRole: Ref<string | undefined> = ref(authStore.getUserRole());

onBeforeRouteLeave((to, from, next) => {
  useCleanUpModal(loginModal.value?.modal);
  next();
});
</script>

<style scoped>
aside {
  width: 280px;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  /*background-color: #4b6d6a;*/
  background-color: var(--bs-success);
}

main {
  height: 100vh;
  margin-left: 280px;
  padding: 10px;
  background-image: linear-gradient(
      to bottom right,
      rgba(192, 255, 195, 0.75),
      rgba(237, 243, 230, 0.91),
      rgba(89, 253, 158, 0.75)
    ),
    url("@/assets/images/pharmacy-background.webp");
  background-size: cover !important;
  background-position: bottom !important;
}

.btn-hover:hover {
  transform: translateY(-3px);
  /*box-shadow: var(--bs-card-box-shadow);*/
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in;
  cursor: pointer;
}

.btn-hover:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: rgba(89, 253, 158, 0.55);
  /*box-shadow: inset 0 0 5px gray;*/
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /*background: var(--bs-secondary);*/
  background: rgba(192, 255, 195, 0.55);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(111, 189, 119, 0.45);
}
</style>
