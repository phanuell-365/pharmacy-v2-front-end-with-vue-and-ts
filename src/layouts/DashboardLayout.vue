<template>
  <div class="container">
    <div class="row justify-content-evenly">
      <div class="col col-7 col-lg-7 col-md-7 card m-1">
        <DashboardCarousel>
          <DashboardCarouselCard
            v-for="cardItem in dashboardCarouselCards"
            :key="cardItem.name"
            :active="cardItem.active"
          >
            <DashboardCardItem
              v-for="card in cardItem.cards"
              :key="card.totalText"
              :href="card.href"
              :total-text="card.totalText"
              :total-value="card.totalValue"
            />
          </DashboardCarouselCard>
        </DashboardCarousel>
      </div>
      <div class="col col-4 col-lg-4 col-md-4 card m-1">
        <DashboardCarousel>
          <DashboardCarouselReport>
            <DashboardCarouselCard
              v-for="cardItem in dashboardCarouselReportCards"
              :key="cardItem.name"
              :active="cardItem.active"
              :interval="6000"
            >
              <CardReportItem :totals="cardItem.cards" />
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
import type { SaleDto, SalesDto } from "@/stores/app/sales/dto";

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
const deliveredOrders: Ref<OrderDto[]> = ref([]);
const today_sOrders: Ref<OrderDto[]> = ref([]);
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
const issuedSales: Ref<SalesDto[] | SaleDto[]> = ref([]);
const cancelledSales: Ref<SalesDto[] | SaleDto[]> = ref([]);

// onMounted(
//   async () => {
try {
  orders.value = await ordersStore.fetchOrders();
  cancelledOrders.value = await ordersStore.fetchCancelledOrders();
  pendingOrders.value = await ordersStore.fetchPendingOrders();
  deliveredOrders.value = await ordersStore.fetchDeliveredOrders();
  today_sOrders.value = await ordersStore.fetchTodayOrders();
  purchases.value = await purchasesStore.fetchPurchases(true);
  today_sPurchases.value = await purchasesStore.fetchTodayPurchases(true);
  medicines.value = await medicinesStore.fetchMedicines();
  suppliers.value = await suppliersStore.fetchSuppliers();
  customers.value = await customersStore.fetchCustomers();
  stocks.value = await stocksStore.fetchStocks();
  outOfStock.value = await stocksStore.fetchOutOfStock();
  expiredStock.value = await stocksStore.fetchExpiredStock();
  sales.value = await salesStore.fetchSales();
  today_sSales.value = await salesStore.fetchTodaySales();
  issuedSales.value = await salesStore.fetchIssuedSales();
  cancelledSales.value = await salesStore.fetchCancelledSales();
} catch (error: any) {
  console.error(error);

  if (error.message.includes("")) {
    console.log(error);
  }
}
//   }
// );

interface DashboardCardItemProps {
  totalValue: number;
  totalText: string;
  href: string;
}

interface DashboardCarouselCards {
  name: string;
  active?: boolean;
  cards: DashboardCardItemProps[];
}

const dashboardCarouselCards: Ref<DashboardCarouselCards[]> = ref([]);

onMounted(() => {
  dashboardCarouselCards.value = [
    {
      name: "card-one",
      active: true,
      cards: [
        {
          totalText: "Total Orders",
          totalValue: orders.value.length,
          href: "/orders",
        },
        {
          totalText: "Total Purchases",
          totalValue: purchases.value.length,
          href: "/purchases",
        },
        {
          totalText: "Total Medicines",
          totalValue: medicines.value.length,
          href: "/medicines",
        },
        {
          totalText: "Total Suppliers",
          totalValue: suppliers.value.length,
          href: "/suppliers",
        },
      ],
    },
    {
      name: "card-two",
      cards: [
        {
          totalText: "Total Customers",
          totalValue: customers.value.length,
          href: "/customers",
        },
        {
          totalText: "Out of stock",
          totalValue: outOfStock.value.length,
          href: "/stocks/out-of-stock",
        },
        {
          totalText: "Cancelled Orders",
          totalValue: cancelledOrders.value.length,
          href: "/orders/cancelled",
        },
        {
          totalText: "Issued Sales",
          totalValue: issuedSales.value.length,
          href: "/sales/issued",
        },
      ],
    },
    {
      name: "card-three",
      cards: [
        {
          totalText: "Pending Orders",
          totalValue: pendingOrders.value.length,
          href: "/orders/pending",
        },
        {
          totalText: "Expired Stock",
          totalValue: expiredStock.value.length,
          href: "/stocks/expired",
        },
        {
          totalText: "Delivered Orders",
          totalValue: deliveredOrders.value.length,
          href: "/orders/delivered",
        },
        {
          totalText: "Cancelled Sales",
          totalValue: cancelledSales.value.length,
          href: "/sales/cancelled",
        },
      ],
    },
  ];
});

// Today's Reports

interface CardReportTableRowProps {
  totalText: string;
  totalValue: number;
  money?: boolean;
}

const calculateTotal = (val: number[]) => {
  let total = 0;

  val.forEach((value) => (total += +value));

  return total;
};

const purchaseTotals = ref(
  today_sPurchases.value.map((value) => value.totalPackSizePrice)
);

const totalPurchases = calculateTotal(purchaseTotals.value as number[]);

const salesTotals = ref(today_sSales.value.map((value) => value.totalPrices));

const totalSales = calculateTotal(salesTotals.value);

interface DashboardCarouselReportCards {
  name: string;
  active?: boolean;
  cards: CardReportTableRowProps[];
}

const dashboardCarouselReportCards: Ref<DashboardCarouselReportCards[]> = ref(
  []
);

onMounted(() => {
  dashboardCarouselReportCards.value = [
    {
      name: "report-card-one",
      active: true,
      cards: [
        {
          totalText: "Total Purchases",
          totalValue: totalPurchases,
          money: true,
        },
        {
          totalText: "Total Sales",
          totalValue: totalSales,
          money: true,
        },
      ],
    },
    {
      name: "report-card-two",
      cards: [
        {
          totalText: "Total Orders",
          totalValue: today_sOrders.value.length,
        },
        {
          totalText: "Total Sales",
          totalValue: today_sSales.value.length,
        },
      ],
    },
  ];
});
</script>
<style scoped></style>
