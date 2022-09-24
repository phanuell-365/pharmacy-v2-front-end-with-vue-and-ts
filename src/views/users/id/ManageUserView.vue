<template>
  <section class="manage-user">
    <SidebarLayout>
      <template #body>
        <ManageUser :update-mode="update" :user-id="userId" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageUser from "@/components/app/users/ManageUser.vue";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { ref } from "vue";

const route = useRoute();

const params = route.params["id"];

const query = route.query["update"];

const userId: Ref<string | null> = ref(null);

const update: Ref<boolean | null> = ref(null);

if (!Array.isArray(params)) userId.value = params;

if (!Array.isArray(query)) update.value = !!query;
</script>

<style scoped></style>
