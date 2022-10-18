<template>
  <NotFoundBase :path="currentPath" name="medicine" page-name="Medicine">
    <template #text-content>
      <span class="fs-5 fw-light d-block">
        Sorry, we couldn't find a medicine with the id
        <span class="text-success">"{{ invalidId }}"</span>
      </span>
    </template>
    <template #go-back>
      <button
        class="mt-5 fw-bold fs-5 text-success btn btn-light bg-transparent border-0 position-relative"
        @click="onGoHomeClick"
      >
        <span class="btn-icon mx-1">Go Home</span>
        <FontAwesome :icon-name="ARROW_RIGHT_ICON" class="mx-2 icon" />
      </button>
    </template>
    <template #footer>
      <RouterLink class="link-secondary mx-3 text-decoration-none" to="/"
        >Get Started
      </RouterLink>
      |
      <RouterLink
        class="link-secondary mx-3 text-decoration-none"
        to="/medicines/create"
      >
        Create Medicine
      </RouterLink>
      |
      <RouterLink
        class="link-secondary text-decoration-none mx-3"
        to="/medicines"
      >
        Manage Medicines
      </RouterLink>
    </template>
  </NotFoundBase>
</template>

<script lang="ts" setup>
import NotFoundBase from "./NotFoundBase.vue";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { ARROW_RIGHT_ICON } from "@/constants/icons";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

interface NotFoundMedicineProps {
  invalidId: string;
}

defineProps<NotFoundMedicineProps>();

const currentPath = route.path;

const onGoHomeClick = () => {
  router.push("/dashboard");
};
</script>

<style scoped></style>
