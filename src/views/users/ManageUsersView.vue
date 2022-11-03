<template>
  <section class="manage-users">
    <SidebarLayout>
      <template #body>
        <ManageUsers />
      </template>
      <template #footer>
        <FormButtonsContainer>
          <FormButton
            class="my-1"
            skin="dark"
            text="Download Report"
            @click="onDownloadReportClick"
          />
        </FormButtonsContainer>
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageUsers from "@/components/app/users/ManageUsers.vue";
import FormButton from "@/components/button/FormButton.vue";
import FormButtonsContainer from "@/components/form/FormButtonsContainer.vue";
import { useUsersStore } from "@/stores/app/users/users";

const usersStore = useUsersStore();

const onDownloadReportClick = () => {
  usersStore.generateUsersReports();
};
</script>

<style scoped></style>
