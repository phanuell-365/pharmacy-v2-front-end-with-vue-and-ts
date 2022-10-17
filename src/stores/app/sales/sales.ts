import { defineStore } from "pinia";
import type {
  SaleDto,
  SalesDto,
  SalesWithCustomerIdDto,
  SalesWithIdsDto,
} from "@/stores/app/sales/dto/sale.dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import type { NewSalesDto, UpdateSaleDto } from "@/stores/app/sales/dto";
import { useFetchReport } from "@/composables/use-fetch-report";

const SALES_DEFAULT: SalesDto = {
  id: "",
  customer: "",
  medicines: "",
  saleDate: "",
  totalPrices: 0,
  amountReceived: 0,
};

const SALE_DEFAULT: SaleDto = {
  id: "",
  // customer: "",
  medicine: "",
  issueUnitQuantity: 0,
  issueUnitPrice: "",
  status: "",
  saleDate: "",
  totalPrice: 0,
  // amountReceived: 0,
};

const ALL_SALE_DEFAULT: SaleDto = {
  id: "",
  customer: "",
  medicine: "",
  issueUnitQuantity: 0,
  issueUnitPrice: "",
  status: "",
  saleDate: "",
  totalPrice: 0,
  amountReceived: 0,
};

interface SalesState {
  sales: SalesDto[];
  sale: SaleDto | null;
  saleStatus: string[];
}

export const useSalesStore = defineStore({
  id: "sales",
  state: (): SalesState => ({
    sales: [],
    sale: null,
    saleStatus: [],
  }),
  getters: {
    getSalesAttributes: () =>
      Object.keys(SALES_DEFAULT).filter((value) => value !== "id"),
    getSaleAttributes: () =>
      Object.keys(SALE_DEFAULT).filter((value) => value !== "id"),
    getAllSaleAttributes: () =>
      Object.keys(ALL_SALE_DEFAULT).filter(
        (value) => value !== "id" && value !== "amountReceived"
      ),
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

      if (!response.ok) throw data as Error;

      this.sales = data as SalesDto[];

      return this.sales;
    },

    async fetchSalesWithId(): Promise<SalesWithCustomerIdDto[]> {
      const response: Response = await fetch(`${BASE_URL}/sales?withId=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SalesWithCustomerIdDto[];
    },

    async fetchTodaySales() {
      const response: Response = await fetch(`${BASE_URL}/sales?today=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

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

      if (!response.ok) throw data as Error;

      return data as SaleDto[];
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

      if (!response.ok) throw data as Error;

      return data as SaleDto[];
    },

    async fetchPendingSales() {
      const response: Response = await fetch(
        `${BASE_URL}/sales?status=pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SaleDto[];
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

      if (!response.ok) throw data as Error;

      return data as SaleDto;
    },

    async fetchSalesStatus() {
      const response: Response = await fetch(
        `${BASE_URL}/sales?resource=status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.saleStatus = data;

      return this.saleStatus;
    },

    async fetchSalesByCustomerId(customerId: string) {
      const response: Response = await fetch(
        `${BASE_URL}/sales/customer/${customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SaleDto[];
    },

    async fetchSaleById(saleId: string, withId: boolean = false) {
      const response: Response = await fetch(
        `${BASE_URL}/sales/${saleId}?withId=${withId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      if (withId) return data as SalesWithIdsDto;
      return data as SaleDto;
    },

    async updateSale(saleId: string, payload: UpdateSaleDto) {
      const response: Response = await fetch(`${BASE_URL}/sales/${saleId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SaleDto;
    },

    async deleteSale(saleId: string) {
      const response: Response = await fetch(`${BASE_URL}/sales/${saleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
      });

      if (response.status === 204) return "Deleted the sale successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the sale!");
        }
        return "Failed to delete the sale!";
      }
    },

    async generateSalesReports(
      category?: "ungrouped" | "grouped",
      selection?: string
    ) {
      return await useFetchReport(
        `sales?${category}=true&selection=${selection}`
      );
    },

    async generateSalesReceipt(customerId: string) {
      return await useFetchReport(`sales/customers/${customerId}`);
    },
  },
});
