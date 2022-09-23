<template>
  <section class="not-found">
    <!--  <div-->
    <!--    class="d-flex not-found-container justify-content-center align-items-center"-->
    <!--  >-->
    <div class="container-fluid border-0 m-0">
      <div class="row justify-content-center align-content-center m-auto mb-0">
        <div class="text-center text-success mb-4">
          <div class="icon-container">
            <FontAwesome :icon-name="CODE_ICON" class="fa-5x" />
          </div>
        </div>
        <div class="text-center mt-4">
          <h4 class="fs-4 fw-bolder text-success">404</h4>
          <h1 class="fs-1 fw-bolder lead error-text text-dark">
            Page not found.
          </h1>
          <span class="fs-5 fw-light d-block">
            Sorry, we couldn't find the page
            <span class="text-success">"{{ currentPath }}"</span>.
          </span>
          <button
            class="mt-5 fw-bold fs-5 text-success btn btn-light bg-transparent border-0"
            @click="onGoBackClick"
          >
            Go back
            <FontAwesome :icon-name="ARROW_RIGHT_ICON" class="mx-2" />
          </button>
        </div>
      </div>
    </div>
    <footer class="d-flex justify-content-center">
      <RouterLink class="link-secondary text-decoration-none" to="/"
        >Get Started
      </RouterLink>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { ARROW_RIGHT_ICON, CODE_ICON } from "@/constants/icons";

const route = useRoute();
const router = useRouter();

// const params = route.params["notFound"];
//
// const firstParam = ref("");

const currentPath = route.path;

const previousPath = route.redirectedFrom;

console.log(previousPath);

const onGoBackClick = () => {
  router.back();
};
</script>

<style scoped>
@font-face {
  font-family: Monteserrat-Bold;
  src: url("./src/assets/fonts/Montserrat-Bold.ttf");
}

.not-found {
  background-image: linear-gradient(
      to top right,
      rgba(176, 239, 203, 0.95),
      rgba(240, 250, 224, 0.84)
    ),
    url("./src/assets/images/tablets_one.jpg") !important;
  background-size: cover !important;
  background-position: bottom !important;
  height: 99vh;
}

.container-fluid .row {
  height: 90vh;
}

.error-text {
  font-family: "Monteserrat-Bold", Ubuntu, sans-serif;
}
</style>
