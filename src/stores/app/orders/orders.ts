import { defineStore } from "pinia";
import type {
  OrderDto,
  OrderDtoWithId,
} from "@/stores/app/orders/dto/order.dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import type { NewOrderDto } from "@/stores/app/orders/dto";
import type { UpdateOrderDto } from "@/stores/app/orders/dto/update-order.dto";

const ORDER_DEFAULT: OrderDto = {
  id: "",
  orderQuantity: 0,
  status: "",
  medicine: "",
  supplier: "",
  orderDate: "",
};

interface OrdersState {
  orders: OrderDto[];
  orderStatuses: string[];
}

export const useOrdersStore = defineStore({
  id: "orders",
  state: (): OrdersState => ({
    orders: [],
    orderStatuses: [],
  }),
  getters: {
    getOrderAttributes: () =>
      Object.keys(ORDER_DEFAULT).filter((value) => value !== "id"),
  },
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

    async fetchOrderById(orderId: string, withId: boolean) {
      const response = await fetch(
        `${BASE_URL}/orders/${orderId}?withId=${withId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      if (withId) return data as OrderDtoWithId;
      return data as OrderDto;
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

    async fetchTodayOrders() {
      const response = await fetch(`${BASE_URL}/orders?today=true`, {
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

    async fetchOrderStatus(mode: "create" | "update" = "create") {
      const response = await fetch(
        `${BASE_URL}/orders?resource=status&meta=${mode}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      this.orderStatuses = data as string[];

      return this.orderStatuses;
    },

    async addOrder(payload: NewOrderDto) {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data as OrderDto;
    },

    async updateOrder(payload: UpdateOrderDto, orderId: string) {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as OrderDto;
    },

    async deleteOrder(orderId: string) {
      const response: Response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
      });

      if (response.status === 204) return "Deleted the order successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the order!");
        }
        return "Failed to delete the order!";
      }
    },
  },
});
