<script lang="ts" setup>
import { RouterView } from "vue-router";
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { SPINNER } from "@/constants/icons";
</script>

<template>
  <RouterView #="{ Component, route }">
    <template v-if="Component">
      <KeepAlive :max="1">
        <Suspense :timeout="0">
          <Transition mode="in-out" name="router">
            <component :is="Component" :key="route.name"></component>
          </Transition>
          <template #fallback>
            <div
              class="vh-100 d-flex spinner-container justify-content-center align-items-center"
            >
              <div class="m-auto my-5">
                <FontAwesome
                  :icon-name="SPINNER"
                  class="text-success text-center m-auto"
                />
              </div>
            </div>
          </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
</template>

<style scoped>
.spinner-container {
  overflow: auto;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.router-enter-active {
  transform: translateY(25px);
  transition: all 0.3s ease-in;
  opacity: 0.5;
  /*transition: all 1s ease-in;*/
}

.router-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.router-leave-from {
  opacity: 1;
  transform: translateY(50px);
}

.router-leave-active {
  /*transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);*/
  opacity: 0.5;
  transform: translateY(25px);
  transition: all 0.3s ease-out;
}

.router-leave-to {
  transform: translateY(0px);
  opacity: 0;
}
</style>

<style>
@font-face {
  font-family: "Lato";
  src: url("@/assets/fonts/Lato-Regular.ttf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Lato", Ubuntu, sans-serif !important;
  padding: 0;
  color: #777 !important;
}
</style>
