<template>
  <section>
    <aside class="d-flex flex-column flex-shrink-0 p-3 text-white">
      <SidebarContainer :menu="menu" />
    </aside>
    <main>
      <div class="row mx-2 align-items-center">
        <div class="col-6">
          <p class="fw-bold text-muted mb-0 lead">
            {{ startCase(sidebarStore.getSidebarMenuName) }}
          </p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <LoginStatus />
        </div>
        <Teleport to="body">
          <template v-if="!isLoggedIn">
            <LoginModal ref="loginModal" />
          </template>
        </Teleport>
      </div>
      <CardLayout name="card">
        <template #heading>
          <small class="text-start fw-normal small p-0 m-auto m-0">
            {{ startCase(sidebarStore.sidebarSubMenu?.description) }}</small
          >
        </template>
        <template #body>
          <slot name="body" />
        </template>
        <template #footer>
          <slot name="footer" />
        </template>
      </CardLayout>
    </main>
  </section>
</template>

<script lang="ts" setup>
import CardLayout from "./CardLayout.vue";
import LoginStatus from "@/components/LoginStatus.vue";
import LoginModal from "@/components/modal/login/LoginModal.vue";
import SidebarContainer from "@/components/sidebar/SidebarContainer.vue";
import { useAuthStore } from "@/stores/auth";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useCleanUpModal } from "@/composables/clean-up-modal";
import { ref } from "vue";
import { menu } from "@/constants/sidebar";
import { useSidebarStore } from "@/stores/sidebar/sidebar";
import startCase from "lodash/startCase";

const loginModal = ref();

const route = useRoute();

const routeName = route.name as string;

const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

sidebarStore.setUpSidebarMenu(routeName);

const isLoggedIn = authStore.isLoggedIn();

onBeforeRouteLeave((to, from, next) => {
  useCleanUpModal(loginModal.value?.modal);
  next();
});
</script>

<style scoped>
aside {
  width: 280px;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  /*background-color: #4b6d6a;*/
  background-color: var(--bs-success);
}

main {
  height: 100%;
  margin-left: 280px;
  padding: 10px;
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
