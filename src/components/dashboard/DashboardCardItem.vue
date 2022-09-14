<template>
  <RouterLink :to="href" class="col-5 card border-secondary bg-light m-1 p-1 text-decoration-none text-secondary">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="row d-flex align-items-center">
            <div class="col-8 flex-md-shrink-0">
              <CardTotalValue :total-value="totalValue"/>
            </div>
            <div class="col-4">
              <CardTotalIcon :rate="totalValue"/>
            </div>
          </div>
        </div>
        <div class="col-12">
          <CardTotalText :total-text="totalText"/>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import CardTotalValue from "./item/CardTotalValue.vue";
import CardTotalText from "./item/CardTotalText.vue";
import CardTotalIcon from "./item/CardTotalIcon.vue";

interface DashboardCardItemProps {
  totalValue: number;
  totalText: string;
  href: string;
}

defineProps<DashboardCardItemProps>()
</script>

<style scoped>

</style>
