import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue")
    },

    // users' routes
    {
      path: "/users",
      name: "view-users",
      component: () => import("../views/users/ViewUsersView.vue")
    },
    {
      path: "/users/create",
      name: "add-user",
      component: () => import("../views/users/AddUserView.vue")
    },
    {
      path: "/users/update",
      name: "manage-users",
      component: () => import("../views/users/ManageUsersView.vue")
    },
    {
      path: "/users/:id",
      name: "view-user",
      component: () => import("../views/users/id/ViewUserView.vue"),
      props: true
    },
    {
      path: "/users/:id/update",
      name: "manage-user",
      component: () => import("../views/users/id/ManageUserView.vue"),
      props: true
    },
    {
      path: "/users/reports",
      name: "users-reports",
      component: () => import("../views/users/UsersReportsView.vue")
    },

    // customers' routes
    {
      path: "/customers/create",
      name: "add-customer",
      component: () => import("../views/customers/AddCustomer.vue")
    },
    {
      path: "/customers",
      name: "view-customers",
      component: () => import("../views/customers/ViewCustomers.vue")
    },
    {
      path: "/customers/update",
      name: "manage-customers",
      component: () => import("../views/customers/ManageCustomers.vue")
    },
    {
      path: "/customers/:id",
      name: "view-customer",
      component: () => import("../views/customers/id/ViewCustomer.vue"),
      props: true
    },
    {
      path: "/customers/:id/update",
      name: "manage-customer",
      component: () => import("../views/customers/id/ManageCustomer.vue"),
      props: true
    }
  ]
});

export default router;
