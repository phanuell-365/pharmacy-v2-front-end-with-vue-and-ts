<template>
  <section class="manage-customer">
    <SidebarLayout>
      <template #body>
        <ManageCustomer :customer-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ManageCustomer from "@/components/app/customers/ManageCustomer.vue";

interface ManageUserProps {
  id: string;
}

defineProps<ManageUserProps>();
</script>

<style scoped></style>
