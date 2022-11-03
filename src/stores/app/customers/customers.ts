import { defineStore } from "pinia";
import type {
  CustomerDto,
  NewCustomerDto,
  UpdateCustomerDto,
} from "@/stores/app/customers/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import { useFetchReport } from "@/composables/use-fetch-report";

const CUSTOMER_DEFAULT: CustomerDto = {
  id: "",
  name: "",
  email: "",
  phone: "",
};

interface CustomersState {
  customers: CustomerDto[];
}

export const useCustomersStore = defineStore({
  id: "customers",
  state: (): CustomersState => ({
    customers: [],
  }),
  getters: {
    getCustomerAttributes: () =>
      Object.keys(CUSTOMER_DEFAULT).filter((value) => value !== "id"),
  },
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

      if (!response.ok) throw data as Error;

      this.customers = data as CustomerDto[];

      return this.customers;
    },

    async addCustomer(payload: NewCustomerDto) {
      const response = await fetch(`${BASE_URL}/customers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as CustomerDto;
    },

    async fetchCustomerById(customerId: string, paranoid: boolean = true) {
      const response = await fetch(
        `${BASE_URL}/customers/${customerId}?paranoid=${paranoid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw data as Error;
      }

      return data as CustomerDto;
    },

    async updateCustomer(customerId: string, payload: UpdateCustomerDto) {
      const response = await fetch(`${BASE_URL}/customers/${customerId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as CustomerDto;
    },

    async deleteCustomer(customerId: string) {
      const response: Response = await fetch(
        `${BASE_URL}/customers/${customerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken(),
          },
        }
      );

      if (response.status === 204) return "Deleted the customer successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the customer!");
        }
        return "Failed to delete the customer!";
      }
    },

    async generateCustomersReport() {
      return await useFetchReport("customers");
    },
  },
});
