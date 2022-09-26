<template>
  <section class="manage-customer">
    <SidebarLayout>
      <template #body>
        <ManageCustomer :customer-id="customerId" :update-mode="update" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageCustomer from "@/components/app/customers/ManageCustomer.vue";
import type { Ref } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const params = route.params["id"];

const query = route.query["update"];

const customerId: Ref<string | null> = ref(null);

const update: Ref<boolean | null> = ref(null);

if (!Array.isArray(params)) customerId.value = params;

if (!Array.isArray(query)) update.value = !!query;
</script>

<style scoped></style>
