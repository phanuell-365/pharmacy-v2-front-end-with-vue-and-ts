import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore();
      //   if (!authStore.isAdmin() || !authStore.isChiefPharmacist()) {
      //     return next("/medicines");
      //   } else
      //     return next({
      //       name: "un-authorized",
      //       path: "/un-authorized",
      //       params: { action: "add-user" },
      //     });
      // },
    },

    // users' routes
    {
      path: "/users/create",
      name: "add-user",
      component: () => import("../views/users/AddUserView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAdmin() || authStore.isChiefPharmacist()) {
          return next();
        } else
          return next({
            name: "un-authorized",
            path: "/un-authorized",
            params: { action: "add-user" },
          });
      },
    },
    {
      path: "/users",
      name: "manage-users",
      component: () => import("../views/users/ManageUsersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAdmin() || authStore.isChiefPharmacist()) {
          return next();
        } else
          return next({
            name: "un-authorized",
            path: "/un-authorized",
            params: { action: "manage-users" },
          });
      },
    },
    {
      path: "/users/:id",
      name: "manage-user",
      component: () => import("../views/users/id/ManageUserView.vue"),
      props: (route) => ({
        userId: route.params.id,
        update: !!route.query.update,
      }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (
          authStore.isAdmin() ||
          authStore.isChiefPharmacist() ||
          authStore.isPharmacist() ||
          authStore.isPharmacistAssistant() ||
          authStore.isPharmacyTechnician()
        ) {
          return next();
        } else
          return next({
            name: "un-authorized",
            path: "/un-authorized",
            params: { action: "manage-user" },
          });
      },
    },
    // {
    //   path: "/users/:id/update",
    //   name: "manage-user",
    //   component: () => import("../views/users/id/ManageUserView.vue"),
    //   props: true,
    // },
    // {
    //   path: "/users/reports",
    //   name: "users-reports",
    //   component: () => import("../views/users/UsersReportsView.vue"),
    // },

    // medicines' routes
    {
      path: "/customers/create",
      name: "add-customer",
      component: () => import("../views/customers/AddCustomerView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-customer" },
        });
      },
    },
    {
      path: "/customers",
      name: "manage-customers",
      component: () => import("../views/customers/ManageCustomersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-customers" },
        });
      },
    },
    {
      path: "/customers/:id",
      name: "manage-customer",
      // name: "view-customer",
      component: () => import("../views/customers/id/ManageCustomerView.vue"),
      // component: () => import("../views/customers/id/ViewCustomerView.vue"),
      props: (route) => ({
        customerId: route.params.id,
        update: !!route.query.update,
      }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-customer" },
        });
      },
    },
    // {
    //   path: "/customers/:id/update",
    // },

    // sales routes
    {
      path: "/sales/create",
      name: "add-sale",
      component: () => import("../views/sales/AddSaleView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-sale" },
        });
      },
    },

    {
      path: "/sales/customer/:id",
      name: "manage-customer-sales",
      component: () =>
        import("../views/sales/id/ManageSalesByCustomerView.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-customer-sales" },
        });
      },
    },

    {
      path: "/sales/:id",
      name: "manage-sale",
      component: () => import("../views/sales/id/ManageSaleView.vue"),

      props: (route) => ({
        saleId: route.params.id,
        update: !!route.query.update,
      }),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-sale" },
        });
      },
    },

    {
      path: "/sales",
      name: "manage-sales",
      component: () => import("../views/sales/ManageSalesView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-sale" },
        });
      },
    },

    {
      path: "/sales/issued",
      name: "issued-sales",
      component: () => import("../views/sales/ViewIssuedSales.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "issued-sale" },
        });
      },
    },

    {
      path: "/sales/pending",
      name: "pending-sales",
      component: () => import("../views/sales/ViewPendingSales.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "pending-sale" },
        });
      },
    },

    {
      path: "/sales/cancelled",
      name: "cancelled-sales",
      component: () => import("../views/sales/ViewCancelledSales.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "cancelled-sales" },
        });
      },
    },
    {
      path: "/sales/reports/monthly-sales",
      name: "monthly-sales",
      component: () => import("../views/sales/MonthlySalesView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "monthly-sales" },
        });
      },
    },
      /*
    {
      path: "/sales/reports/daily-sales/:saleDate",
      name: "daily-sales",
      component: () => import("../views/sales/DailySalesView.vue"),
      props: (route) => ({ saleDate: route.params.saleDate }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "daily-sales" },
        });
      },
    },*/

    // medicines routes
    {
      path: "/medicines/create",
      name: "add-medicine",
      component: () => import("../views/medicines/AddMedicineView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-medicine" },
        });
      },
    },
    {
      path: "/medicines",
      name: "manage-medicines",
      component: () => import("../views/medicines/ManageMedicinesView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-medicines" },
        });
      },
    },
    {
      path: "/medicines/:id",
      name: "manage-medicine",
      component: () => import("../views/medicines/id/ManageMedicineView.vue"),
      props: (route) => ({
        medicineId: route.params.id,
        update: !!route.query.update,
        stock: !!route.query.stock,
      }),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-medicine" },
        });
      },
    },

    {
      path: "/medicines/out-of-stock",
      name: "medicines-out-of-stock",
      component: () => import("../views/medicines/ViewOutOfStockView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "medicines-out-of-stock" },
        });
      },
    },

    {
      path: "/medicines/stock",
      name: "medicines-stock",
      component: () => import("../views/medicines/ManageStockView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "medicines-stock" },
        });
      },
    },

    {
      path: "/medicines/expired",
      name: "expired-stock",
      component: () => import("../views/medicines/ViewExpiredStockView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "expired-stock" },
        });
      },
    },

    {
      path: "/medicines/order",
      name: "place-medicine-order",
      component: () => import("../views/medicines/PlaceAnOrderView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "place-medicine-order" },
        });
      },
    },

    // stocks routes
    {
      path: "/stocks/create",
      name: "add-stock",
      component: () => import("../views/stock/AddStockView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-stock" },
        });
      },
    },
    {
      path: "/stocks",
      name: "manage-stocks",
      component: () => import("../views/stock/ManageStocksView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-stocks" },
        });
      },
    },

    // suppliers routes
    {
      path: "/suppliers/create",
      name: "add-supplier",
      component: () => import("../views/suppliers/AddSupplierView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-supplier" },
        });
      },
    },
    {
      path: "/suppliers",
      name: "manage-suppliers",
      component: () => import("../views/suppliers/ManageSuppliersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-suppliers" },
        });
      },
    },

    {
      path: "/suppliers/:id",
      name: "manage-supplier",
      // name: "view-customer",
      component: () => import("../views/suppliers/id/ManageSupplierView.vue"),
      // component: () => import("../views/customers/id/ViewCustomerView.vue"),
      props: (route) => ({
        supplierId: route.params.id,
        update: route.query.update,
      }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-supplier" },
        });
      },
    },

    // orders routes
    {
      path: "/orders/create/:medicineId?",
      name: "add-order",
      component: () => import("../views/orders/AddOrderView.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-order" },
        });
      },
    },
    {
      path: "/orders",
      name: "manage-orders",
      component: () => import("../views/orders/ManageOrdersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-orders" },
        });
      },
    },
    {
      path: "/orders/active",
      name: "active-orders",
      component: () => import("../views/orders/ViewActiveOrdersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "active-orders" },
        });
      },
    },
    {
      path: "/orders/pending",
      name: "pending-orders",
      component: () => import("../views/orders/ViewPendingOrdersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "pending-orders" },
        });
      },
    },
    {
      path: "/orders/delivered",
      name: "delivered-orders",
      component: () => import("../views/orders/ViewDeliveredOrdersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "delivered-orders" },
        });
      },
    },
    {
      path: "/orders/cancelled",
      name: "cancelled-orders",
      component: () => import("../views/orders/ViewCancelledOrdersView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "cancelled-orders" },
        });
      },
    },
    {
      path: "/orders/:id",
      name: "manage-order",
      component: () => import("../views/orders/id/ManageOrderView.vue"),
      props: (route) => ({
        orderId: route.params.id,
        update: !!route.query.update,
      }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-order" },
        });
      },
    },

    // purchases routes
    {
      path: "/purchases/create",
      name: "add-purchase",
      component: () => import("../views/purchases/AddPurchaseView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "add-purchases" },
        });
      },
    },
    {
      path: "/purchases",
      name: "manage-purchases",
      component: () => import("../views/purchases/ManagePurchasesView.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-purchases" },
        });
      },
    },

    {
      path: "/purchases/:id",
      name: "manage-purchase",
      component: () => import("../views/purchases/id/ManagePurchaseView.vue"),

      props: (route) => ({
        purchaseId: route.params.id,
        update: !!route.query.update,
      }),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "manage-purchase" },
        });
      },
    },

    // UnAuthorized
    {
      path: "/un-authorized/:action?",
      name: "un-authorized",
      component: () => import("../components/error/UnAuthorized.vue"),
      props: true,
    },

    // the all routes handlers

    // users
    {
      path: "/errors/users/:invalidId(.*)",
      name: "invalid-user-id",
      component: () => import("../components/error/NotFoundUser.vue"),
      props: true,
    },

    // customers
    {
      path: "/errors/customers/:invalidId(.*)",
      name: "invalid-customer-id",
      component: () => import("../components/error/NotFoundCustomer.vue"),
      props: true,
    },

    // suppliers

    {
      path: "/errors/suppliers/:invalidId(.*)",
      name: "invalid-supplier-id",
      component: () => import("../components/error/NotFoundSupplier.vue"),
      props: true,
    },

    // medicines
    {
      path: "/errors/medicines/:invalidId(.*)",
      name: "invalid-medicine-id",
      component: () => import("../components/error/NotFoundMedicine.vue"),
      props: true,
    },

    // orders
    {
      path: "/errors/orders/:invalidId(.*)",
      name: "invalid-order-id",
      component: () => import("../components/error/NotFoundOrder.vue"),
      props: true,
    },

    // purchases
    {
      path: "/errors/purchases/:invalidId(.*)",
      name: "invalid-order-id",
      component: () => import("../components/error/NotFoundPurchase.vue"),
      props: true,
    },
    // all
    {
      path: "/:notFound(.*)*",
      name: "not-found",
      component: () => import("../components/error/NotFound.vue"),
    },
  ],
});

export default router;
