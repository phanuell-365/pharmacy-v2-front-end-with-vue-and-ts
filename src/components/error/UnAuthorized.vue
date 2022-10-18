<template>
  <section class="un-authorized">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="row justify-content-center align-content-center">
                <div class="text-center text-success mb-4">
                  <div class="icon-container">
                    <FontAwesome :icon-name="USER_LOCK" class="fa-5x" />
                  </div>
                </div>
                <div class="text-center mt-4">
                  <h4 class="fs-4 fw-bolder text-success">401</h4>
                  <h1
                    class="fs-1 fw-bolder lead error-text text-dark mb-4 mt-2"
                  >
                    UnAuthorized !
                  </h1>
                  <span class="fs-5 fw-light d-block">
                    Sorry, you are unauthorized to perform this action
                    <span class="text-success">"{{ action }}"</span>.
                  </span>
                  <button
                    class="mt-5 fw-bold fs-5 text-success btn btn-light bg-transparent border-0 position-relative"
                    @click="onGoHomeClick"
                  >
                    <span class="btn-icon mx-1">Go Home</span>
                    <FontAwesome
                      :icon-name="ARROW_RIGHT_ICON"
                      class="mx-2 icon"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-md-12 footer-container py-3">
              <footer class="d-flex justify-content-center error-footer p-2">
                <slot name="footer">
                  <RouterLink
                    class="link-secondary text-decoration-none px-2"
                    to="/"
                    >Get Started
                  </RouterLink>
                  |
                  <RouterLink
                    class="link-secondary text-decoration-none px-2"
                    to="/"
                  >
                    LogIn
                  </RouterLink>
                </slot>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { ARROW_RIGHT_ICON, USER_LOCK } from "@/constants/icons";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();

const action = route.params["action"];

const onGoHomeClick = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
@font-face {
  font-family: Monteserrat-Bold;
  src: url("@/assets/fonts/Montserrat-Bold.ttf");
}

.un-authorized {
  background-image: linear-gradient(
      to right,
      rgba(176, 239, 203, 0.95),
      rgba(240, 250, 224, 0.49)
    ),
    url("@/assets/images/un-authorized.jpg") !important;
  background-size: cover !important;
  background-position: center !important;
  height: 100vh;
}

.container-fluid .row {
  height: 88vh;
}

.error-text {
  font-family: "Monteserrat-Bold", Ubuntu, sans-serif;
  font-size: 3rem;
}

.footer-container {
  background-image: linear-gradient(
    to right,
    rgba(217, 224, 207, 0.32),
    rgba(237, 243, 230, 0.91),
    rgba(217, 224, 207, 0.32)
  );
}

.error-footer {
  height: auto;
}
</style>
