import { defineStore } from "pinia";
import type { SaleDto, SalesDto } from "@/stores/app/sales/dto/sale.dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import type { NewSalesDto } from "@/stores/app/sales/dto";

const SALES_DEFAULT: SalesDto = {
  id: "",
  customer: "",
  medicines: "",
  saleDate: "",
  totalPrices: 0,
};

interface SalesState {
  sales: SalesDto[];
  sale: SaleDto | null;
}

export const useSalesStore = defineStore({
  id: "sales",
  state: (): SalesState => ({
    sales: [],
    sale: null,
  }),
  getters: {
    getSalesAttributes: (state) =>
      Object.keys(SALES_DEFAULT).filter((value) => value !== "id"),
  },
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchSales(): Promise<SalesDto[]> {
      const response: Response = await fetch(`${BASE_URL}/sales`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.sales = data as SalesDto[];

      return this.sales;
    },

    async fetchTodaySales() {
      const response: Response = await fetch(`${BASE_URL}/sales?today=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SalesDto[];
    },

    async fetchCancelledSales() {
      const response: Response = await fetch(
        `${BASE_URL}/sales?status=cancelled`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SalesDto[];
    },

    async fetchIssuedSales() {
      const response: Response = await fetch(
        `${BASE_URL}/sales?status=issued`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SalesDto[];
    },

    async addSales(payload: NewSalesDto) {
      const response: Response = await fetch(
        `${BASE_URL}/sales?status=issued`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload.sales),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SalesDto;
    },
  },
});
