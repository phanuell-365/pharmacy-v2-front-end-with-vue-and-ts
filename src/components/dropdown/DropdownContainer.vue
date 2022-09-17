<template>
  <div ref="dropdownRef" class="dropdown">
    <a id="dropdownUser1" :aria-expanded="ariaExpanded" :class="{show}"
       class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
       data-bs-toggle="dropdown" href="#" @click="onDropdownClickHandler">
      <span class="fs-6 fw-bold p-1">{{ user?.username }}</span>
    </a>
    <DropdownBody :show="show" dropdowns="">
      <template #items>
        <DropdownItem :href="`/users/${user?.id}`" text="view profile" />
        <DropdownItem :href="`/users/${user?.id}/update`" text="update profile" />
        <DropdownItem href="#" text="switch user" @click="onSwitchUserClick" />
      </template>
    </DropdownBody>
    <Teleport to="body">
      <Transition>
        <template v-if="logout">
          <LogoutModal :key="`loginStatus`" name="loginStatus" to="current" />
        </template>
      </Transition>
    </Teleport>

    <!--    <ul :class="{show}" aria-labelledby="dropdownUser1"-->
    <!--        class="dropdown-menu dropdown-menu-dark text-small shadow" data-popper-placement="bottom-start">-->
    <!--      <li><a class="dropdown-item" href="#"><span class="dropdown-item-text">New project...</span></a></li>-->
    <!--      <li><a class="dropdown-item" href="#">Settings</a></li>-->
    <!--      <li><a class="dropdown-item" href="#">Profile</a></li>-->
    <!--      <li>-->
    <!--        <hr class="dropdown-divider">-->
    <!--      </li>-->
    <!--      <li><a class="dropdown-item" href="#">Sign out</a></li>-->
    <!--    </ul>-->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { Dropdown } from "bootstrap";
import DropdownBody from "./DropdownBody.vue";
import DropdownItem from "./DropdownItem.vue";
import LogoutModal from "@/components/modal/logout/LogoutModal.vue";
import type { UserDto } from "@/stores/app/users/dto";

const dropdownRef = ref();

interface DropdownContainerProps {
  user?: UserDto;
}

defineProps<DropdownContainerProps>();

const ariaExpanded = computed(
  () => show.value ? "true" : "false"
);

const dropdown = ref();

onMounted(
  () => (dropdown.value = new Dropdown(dropdownRef.value))
);

const show = ref(false);

const onDropdownClickHandler = () => {
  show.value = !show.value;
};

const logout = ref(false);

const onSwitchUserClick = () => {
  logout.value = true;
};
</script>

<style scoped>
.show-dropdown {
  position: absolute;
  inset: auto auto 0 0;
  margin: 0;
  transform: translate(0px, -34px);
}
</style>
