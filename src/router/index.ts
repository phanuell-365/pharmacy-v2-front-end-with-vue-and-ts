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
        params: route.params.id,
        query: route.query.update,
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
      component: () => import("../views/medicines/ViewMedicineOutOfStock.vue"),

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
      path: "/medicines/expired",
      name: "expired-medicines",
      component: () => import("../views/medicines/ViewExpiredMedicines.vue"),

      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) return next();
        return next({
          name: "un-authorized",
          path: "/un-authorized",
          params: { action: "expired-medicines" },
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

    // all
    {
      path: "/:notFound(.*)*",
      name: "not-found",
      component: () => import("../components/error/NotFound.vue"),
    },
  ],
});

export default router;
