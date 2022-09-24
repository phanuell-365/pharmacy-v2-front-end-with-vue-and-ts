<template>
  <section class="view-customer">
    <SidebarLayout>
      <template #body>
        <ViewCustomer :customer-id="id" />
      </template>
    </SidebarLayout>
  </section>
</template>

<script lang="ts" setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import ViewCustomer from "@/components/app/customers/ViewCustomer.vue";

interface ManageUserProps {
  id: string;
}

defineProps<ManageUserProps>();
</script>

<style scoped></style>
