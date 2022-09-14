<template>
  <section class="users-reports-view">
    <SidebarLayout>
      <template #body>
        <button class="btn btn-light" @click="onGeneratePdfClick">Generate pdf</button>
        {{ response }}
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { useUsersStore } from "@/stores/app/users/users";
import { ref } from "vue";

const usersStore = useUsersStore();

const response = ref();

const onGeneratePdfClick = async () => {
  response.value = await usersStore.generateUsersReports();
};
</script>

<style scoped>

</style>
