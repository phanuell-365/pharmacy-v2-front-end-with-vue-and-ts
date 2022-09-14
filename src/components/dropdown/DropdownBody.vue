<template>
  <ul :class="{show}" aria-labelledby="dropdownUser1"
      class="dropdown-menu dropdown-menu-dark text-small shadow" data-popper-placement="bottom-start">
    <slot name="items"></slot>
    <li>
      <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#" @click="onLogoutClick">
      <FontAwesome :icon-name="LOGOUT_ICON" class="px-2" />
      Log out</a></li>
    <Teleport to="body">
      <Transition>
        <template v-if="logout">
          <LogoutModal :key="`dropdown`" name="dropdown" />
        </template>
      </Transition>
    </Teleport>
  </ul>
</template>

<script lang="ts" setup>
import LogoutModal from "@/components/modal/logout/LogoutModal.vue";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { LOGOUT_ICON } from "@/constants/icons";
import { ref } from "vue";

interface DropdownBodyProps {
  show: boolean;
}

defineProps<DropdownBodyProps>();

const logout = ref(false);

const onLogoutClick = () => {
  logout.value = true;
};
</script>

<style scoped>
.v-enter-from {
  opacity: 0;
  transform: scale(1);
}

.v-enter-active {
  opacity: 0.5;
  transition: all 0.1s;
}

.v-enter-to {
  opacity: 1;
  transform: scale(-1);
}
</style>
