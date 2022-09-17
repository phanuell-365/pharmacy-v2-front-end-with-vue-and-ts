import { defineStore } from "pinia";
import type { CustomerDto } from "@/stores/app/customers/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface CustomersState {
  customers: CustomerDto[];
}

export const useCustomersStore = defineStore({
  id: "customers",
  state: (): CustomersState => ({
    customers: [],
  }),
  getters: {},
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchCustomers(): Promise<CustomerDto[]> {
      const response = await fetch(`${BASE_URL}/customers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.customers = data as CustomerDto[];

      return this.customers;
    },
  },
});
