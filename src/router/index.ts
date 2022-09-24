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
      //   if (authStore.isAdmin() || authStore.isChiefPharmacist()) {
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
            params: { action: "add-user" },
          });
      },
    },
    {
      path: "/users/:id",
      name: "manage-user",
      component: () => import("../views/users/id/ViewUserView.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (
          authStore.isAdmin() ||
          authStore.isChiefPharmacist() ||
          authStore.isPharmacist() ||
          authStore.isPharmacyAssistant() ||
          authStore.isPharmacyTechnician()
        ) {
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
      path: "/users/:id/update",
      name: "manage-user",
      component: () => import("../views/users/id/ManageUserView.vue"),
      props: true,
    },
    // {
    //   path: "/users/reports",
    //   name: "users-reports",
    //   component: () => import("../views/users/UsersReportsView.vue"),
    // },

    // customers' routes
    {
      path: "/customers/create",
      name: "add-customer",
      component: () => import("../views/customers/AddCustomerView.vue"),
    },
    {
      path: "/customers",
      name: "view-customers",
      component: () => import("../views/customers/ViewCustomers.vue"),
    },
    {
      path: "/customers/update",
      name: "manage-customers",
      component: () => import("../views/customers/ManageCustomersView.vue"),
    },
    {
      path: "/customers/:id",
      name: "view-customer",
      component: () => import("../views/customers/id/ViewCustomerView.vue"),
      props: true,
    },
    {
      path: "/customers/:id/update",
      name: "manage-customer",
      component: () => import("../views/customers/id/ManageCustomer.vue"),
      props: true,
    },

    // sales routes
    {
      path: "/sales/create",
      name: "add-sale",
      component: () => import("../views/sales/AddSaleView.vue"),
    },
    {
      path: "/sales",
      name: "manage-sales",
      component: () => import("../views/sales/ManageSalesView.vue"),
    },

    // medicines routes
    {
      path: "/medicines/create",
      name: "add-medicine",
      component: () => import("../views/medicines/AddMedicineView.vue"),
    },
    {
      path: "/medicines",
      name: "manage-medicines",
      component: () => import("../views/medicines/ManageMedicinesView.vue"),
    },
    {
      path: "/medicines/:id",
      name: "manage-medicine",
      component: () => import("../views/medicines/id/ManageMedicineView.vue"),
      props: true,
    },

    // stocks routes
    {
      path: "/stocks/create",
      name: "add-stock",
      component: () => import("../views/stock/AddStockView.vue"),
    },
    {
      path: "/stocks",
      name: "manage-stocks",
      component: () => import("../views/stock/ManageStocksView.vue"),
    },

    // suppliers routes
    {
      path: "/suppliers/create",
      name: "add-supplier",
      component: () => import("../views/suppliers/AddSupplierView.vue"),
    },
    {
      path: "/suppliers",
      name: "manage-suppliers",
      component: () => import("../views/suppliers/ManageSuppliersView.vue"),
    },

    // orders routes
    {
      path: "/orders/create",
      name: "add-order",
      component: () => import("../views/orders/AddOrderView.vue"),
    },
    {
      path: "/orders",
      name: "manage-orders",
      component: () => import("../views/orders/ManageOrdersView.vue"),
    },

    // purchases routes
    {
      path: "/purchases/create",
      name: "add-purchase",
      component: () => import("../views/purchases/AddPurchaseView.vue"),
    },
    {
      path: "/purchases",
      name: "manage-purchases",
      component: () => import("../views/purchases/ManagePurchasesView.vue"),
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
