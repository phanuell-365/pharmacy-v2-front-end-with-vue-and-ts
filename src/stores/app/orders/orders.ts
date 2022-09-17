import { defineStore } from "pinia";
import type { OrderDto } from "@/stores/app/orders/dto/order.dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface OrdersState {
  orders: OrderDto[];
}

export const useOrdersStore = defineStore({
  id: "orders",
  state: (): OrdersState => ({
    orders: [],
  }),
  getters: {},
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchOrders(): Promise<OrderDto[]> {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      this.orders = data as OrderDto[];

      return this.orders;
    },
    async fetchCancelledOrders() {
      const response = await fetch(`${BASE_URL}/orders?status=cancelled`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data as OrderDto[];
    },

    async fetchPendingOrders() {
      const response = await fetch(`${BASE_URL}/orders?status=pending`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data as OrderDto[];
    },

    async fetchActiveOrders() {
      const response = await fetch(`${BASE_URL}/orders?status=active`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data as OrderDto[];
    },

    async fetchDeliveredOrders() {
      const response = await fetch(`${BASE_URL}/orders?status=delivered`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data as OrderDto[];
    },
  },
});
