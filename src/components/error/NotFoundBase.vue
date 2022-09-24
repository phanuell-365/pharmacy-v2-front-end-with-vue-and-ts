<template>
  <section :class="`not-found-${name}`" class="not-found">
    <div class="container-fluid">
      <div class="row justify-content-center align-content-center m-auto mb-0">
        <div class="text-center text-success mb-4">
          <div class="icon-container">
            <FontAwesome :icon-name="CODE_ICON" class="fa-5x" />
          </div>
        </div>
        <div class="text-center mt-4">
          <h4 class="fs-4 fw-bolder text-success">404</h4>
          <h1 class="fs-1 fw-bolder lead error-text text-dark">
            {{ pageName }} not found !
          </h1>
          <slot name="text-content">
            <span class="fs-5 fw-light d-block">
              Sorry, we couldn't find the page
              <span class="text-success">"{{ path }}</span>
            </span>
          </slot>
          <slot name="go-back">
            <button
              class="mt-5 fw-bold fs-5 text-success btn btn-light bg-transparent border-0 position-relative"
              @click="onGoBackClick"
            >
              <span class="btn-icon mx-1">Go back</span>
              <FontAwesome :icon-name="ARROW_RIGHT_ICON" class="mx-2 icon" />
            </button>
          </slot>
        </div>
      </div>
    </div>
    <footer class="d-flex justify-content-center">
      <slot name="footer">
        <RouterLink class="link-secondary text-decoration-none" to="/"
          >Get Started
        </RouterLink>
      </slot>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { ARROW_RIGHT_ICON, CODE_ICON } from "@/constants/icons";

const router = useRouter();

interface NotFoundBaseProps {
  name: string;
  pageName: string;
  path?: string;
}

defineProps<NotFoundBaseProps>();

const onGoBackClick = () => {
  router.back();
};
</script>

<style scoped>
@font-face {
  font-family: Monteserrat-Bold;
  src: url("@/assets/fonts/Montserrat-Bold.ttf");
}

.not-found {
  background-image: linear-gradient(
      to top right,
      rgba(176, 239, 203, 0.95),
      rgba(240, 250, 224, 0.84)
    ),
    url("@/assets/images/tablets_one.jpg") !important;
  background-size: cover !important;
  background-position: bottom !important;
  height: 100vh;
}

.container-fluid .row {
  height: 92vh;
}

.error-text {
  font-family: "Monteserrat-Bold", Ubuntu, sans-serif;
  font-size: 3rem;
}

/*
.btn:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-out;
}*/

.btn-icon:hover {
  transform: translateY(5px) scale(3);
}

.icon:hover {
  transform: translateX(2px);
  transition: all 0.3s ease-in;
}
</style>
