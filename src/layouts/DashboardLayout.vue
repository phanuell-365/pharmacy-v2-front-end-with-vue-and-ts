<template>
  <div class="container">
    <div class="row justify-content-evenly">
      <div class="col col-7 col-lg-7 col-md-7 card m-1">
        <DashboardCarousel>
          <DashboardCarouselCard id="carouselOne" :interval="5000" active>
            <DashboardCardItem v-for="e in 4" :key="e" :total-value="9" href="#" total-text="Total Sales" />
          </DashboardCarouselCard>
          <DashboardCarouselCard id="carouselTwo" :interval="5000">
            <DashboardCardItem v-for="e in 4" :key="e" :total-value="1" href="#" total-text="Total Orders" />
          </DashboardCarouselCard>
          <DashboardCarouselCard id="carouselThree" :interval="5000">
            <DashboardCardItem v-for="e in 4" :key="e" :total-value="1000" href="#" total-text="Total Supplies" />
          </DashboardCarouselCard>
        </DashboardCarousel>
      </div>
      <div class="col col-4 col-lg-4 col-md-4 card m-1">
        <DashboardCarousel>
          <DashboardCarouselReport>
            <DashboardCarouselCard :interval="6000" active>
              <CardReportItem
                :totals="[{totalText: 'Total Supplies', totalValue: 2000}, {totalText: 'Total Supplies', totalValue: 2000}]" />
            </DashboardCarouselCard>
            <DashboardCarouselCard :interval="6000">
              <CardReportItem
                :totals="[{totalText: 'Total Sales', totalValue: 10}, {totalText: 'Total Supplies', totalValue: 2000}]" />
            </DashboardCarouselCard>
          </DashboardCarouselReport>
        </DashboardCarousel>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="card">
        <div class="col col-12 col-lg-12 col-md-12">
          <DashboardActionsContainer :dashboard-actions="DashboardActions" />
        </div>
      </div>
    </div>
  </div>

  <!--  <Teleport to="body">-->
  <!--    <ToastContainer :placement="TOP_RIGHT">-->
  <!--      <LiveToast ref="toastB" skin="danger" />-->
  <!--    </ToastContainer>-->
  <!--  </Teleport>-->

</template>

<script lang="ts" setup>
import DashboardCarousel from "@/components/dashboard/DashboardCarousel.vue";
import DashboardCarouselReport from "@/components/dashboard/DashboardCarouselReport.vue";
import DashboardCarouselCard from "@/components/dashboard/DashboardCarouselCard.vue";
import DashboardCardItem from "@/components/dashboard/DashboardCardItem.vue";
import CardReportItem from "@/components/dashboard/CardReportItem.vue";
import DashboardActionsContainer from "@/components/dashboard/DashboardActionsContainer.vue";
import { DashboardActions } from "@/constants/dashboard-actions";</script>
<style scoped>

</style>
