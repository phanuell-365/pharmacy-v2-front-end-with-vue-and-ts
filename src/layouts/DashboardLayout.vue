<template>
  <div class="container">
    <div class="row justify-content-evenly">
      <div class="col col-7 col-lg-7 col-md-7 card m-1">
        <DashboardCarousel>
          <DashboardCarouselCard id="carouselOne" :interval="5000" active>
            <DashboardCardItem v-for="card in card1" :key="card.totalText" :href="card.href"
                               :total-text="card.totalText" :total-value="card.totalValue" />
          </DashboardCarouselCard>
          <DashboardCarouselCard id="carouselTwo" :interval="5000">
            <DashboardCardItem v-for="card in card2" :key="card.totalText" :href="card.href"
                               :total-text="card.totalText" :total-value="card.totalValue" />
          </DashboardCarouselCard>
          <DashboardCarouselCard id="carouselThree" :interval="5000">
            <DashboardCardItem v-for="card in card3" :key="card.totalText" :href="card.href"
                               :total-text="card.totalText" :total-value="card.totalValue" />
          </DashboardCarouselCard>
        </DashboardCarousel>
      </div>
      <div class="col col-4 col-lg-4 col-md-4 card m-1">
        <DashboardCarousel>
          <DashboardCarouselReport>
            <DashboardCarouselCard :interval="6000" active>
              <CardReportItem
                :totals="todayReports" />
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
import { DashboardActions } from "@/constants/dashboard-actions";
import { useOrdersStore } from "@/stores/app/orders/orders";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import { usePurchasesStore } from "@/stores/app/purchases/purchases";
import type { PurchaseDto } from "@/stores/app/purchases/dto";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useSuppliersStore } from "@/stores/app/suppliers/suppliers";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import { useCustomersStore } from "@/stores/app/customers/customers";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useStocksStore } from "@/stores/app/stock/stocks";
import type { StockDto } from "@/stores/app/stock/dto";
import { useSalesStore } from "@/stores/app/sales/sales";
import type { SalesDto } from "@/stores/app/sales/dto/sale.dto";

const ordersStore = useOrdersStore();
const purchasesStore = usePurchasesStore();
const medicinesStore = useMedicinesStore();
const suppliersStore = useSuppliersStore();
const customersStore = useCustomersStore();
const stocksStore = useStocksStore();
const salesStore = useSalesStore();

const orders: Ref<OrderDto[]> = ref([]);
const cancelledOrders: Ref<OrderDto[]> = ref([]);
const pendingOrders: Ref<OrderDto[]> = ref([]);
const purchases: Ref<PurchaseDto[]> = ref([]);
const today_sPurchases: Ref<PurchaseDto[]> = ref([]);
const medicines: Ref<MedicineDto[]> = ref([]);
const suppliers: Ref<SupplierDto[]> = ref([]);
const customers: Ref<CustomerDto[]> = ref([]);
const stocks: Ref<StockDto[]> = ref([]);
const outOfStock: Ref<StockDto[]> = ref([]);
const expiredStock: Ref<StockDto[]> = ref([]);
const sales: Ref<SalesDto[]> = ref([]);
const today_sSales: Ref<SalesDto[]> = ref([]);
const issuedSales: Ref<SalesDto[]> = ref([]);

onMounted(
  async () => {
    try {
      orders.value = await ordersStore.fetchOrders();
      cancelledOrders.value = await ordersStore.fetchCancelledOrders();
      pendingOrders.value = await ordersStore.fetchPendingOrders();
      purchases.value = await purchasesStore.fetchPurchases();
      today_sPurchases.value = await purchasesStore.fetchTodayPurchases();
      medicines.value = await medicinesStore.fetchMedicines();
      suppliers.value = await suppliersStore.fetchSuppliers();
      customers.value = await customersStore.fetchCustomers();
      stocks.value = await stocksStore.fetchStocks();
      outOfStock.value = await stocksStore.fetchMedicinesOutOfStock();
      expiredStock.value = await stocksStore.fetchExpiredStock();
      sales.value = await salesStore.fetchSales();
      today_sSales.value = await salesStore.fetchTodaySales();
      issuedSales.value = await salesStore.fetchIssuedSales();
    } catch (error: any) {
      console.error(error);
    }
  }
);

interface DashboardCardItemProps {
  totalValue: number;
  totalText: string;
  href: string;
}

const card1: DashboardCardItemProps[] = [
  {
    totalText: "Total Orders",
    totalValue: orders.value.length,
    href: "/orders"
  },
  {
    totalText: "Total Purchases",
    totalValue: purchases.value.length,
    href: "/purchases"
  },
  {
    totalText: "Total Medicines",
    totalValue: medicines.value.length,
    href: "/medicines"
  },
  {
    totalText: "Total Suppliers",
    totalValue: suppliers.value.length,
    href: "/suppliers"
  }
];

const card2: DashboardCardItemProps[] = [
  {
    totalText: "Total Customers",
    totalValue: customers.value.length,
    href: "/customers"
  },
  {
    totalText: "Out of stock",
    totalValue: outOfStock.value.length,
    href: "/stocks/out-of-stock"
  },
  {
    totalText: "Cancelled Orders",
    totalValue: cancelledOrders.value.length,
    href: "/orders/cancelled"
  },
  {
    totalText: "Issued Sales",
    totalValue: issuedSales.value.length,
    href: "/sales/issued"
  }
];

const card3: DashboardCardItemProps[] = [
  {
    totalText: "Pending Orders",
    totalValue: pendingOrders.value.length,
    href: "/orders/pending"
  }, {
    totalText: "Expired Stock",
    totalValue: expiredStock.value.length,
    href: "/stocks/expired"
  }
];

// Today's Reports

interface CardReportTableRowProps {
  totalText: string;
  totalValue: number;
}

const calculateTotal = (val: number[]) => {
  let total = 0;

  val.forEach(value => total += value);

  return total;
};

const purchaseTotals = ref(today_sPurchases.value.map(value => value.totalPackSizePrice));

const totalPurchases = calculateTotal(purchaseTotals.value);

const salesTotals = ref(today_sSales.value.map(value => value.totalPrices));

const totalSales = calculateTotal(salesTotals.value);

const todayReports: CardReportTableRowProps[] = [
  {
    totalText: "Total Purchases",
    totalValue: totalPurchases
  },
  {
    totalText: "Total Sales",
    totalValue: totalSales
  }
];


</script>
<style scoped>

</style>
