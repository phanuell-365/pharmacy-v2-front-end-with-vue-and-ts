<template>
  <NotFoundBase :path="currentPath" name="page" page-name="Page" />
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import NotFoundBase from "./NotFoundBase.vue";

const route = useRoute();

const currentPath = route.path;
</script>

<style scoped></style>
