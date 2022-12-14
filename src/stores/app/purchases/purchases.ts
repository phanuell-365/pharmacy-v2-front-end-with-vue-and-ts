import { defineStore } from "pinia";
import type {
  NewPurchaseDto,
  PurchaseDto,
  UpdatePurchaseDto,
} from "@/stores/app/purchases/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import { useFetchReport } from "@/composables/use-fetch-report";
import { useCurrencyFormatter } from "@/composables/currency-formatter";
import type { MonthlySalesDto } from "@/stores/app/sales/dto";

const PURCHASE_DEFAULT: PurchaseDto = {
  id: "",
  medicine: "",
  supplier: "",
  purchasedPackSizeQuantity: 0,
  pricePerPackSize: "",
  totalPurchasePrice: "",
  // profitMarginPercentagePerIssueUnit: 0,
  // profitMarginPercentagePerPackSize: 0,
  // issueUnitPerPackSize: 0,
  // totalIssueUnitQuantity: 0,
  // orderStatus: "",
  // profitPerIssueUnit: 0,
  // profitPerPackSize: 0,
  // OrderId: "",
  purchaseDate: "",
  orderDate: "",
  expiryDate: "",
};

interface PurchasesState {
  purchases: PurchaseDto[];
  profitPercentage: number;
}

export const usePurchasesStore = defineStore({
  id: "purchases",
  state: (): PurchasesState => ({
    purchases: [],
    profitPercentage: 0,
  }),
  getters: {
    getPurchaseAttributes: () =>
      Object.keys(PURCHASE_DEFAULT).filter((value) => value !== "id"),
  },
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchPurchases(withId: boolean = false): Promise<PurchaseDto[]> {
      const response = await fetch(`${BASE_URL}/purchases?withId=${withId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.purchases = data as PurchaseDto[];

      const formatter = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KSH",
      });

      this.purchases = this.purchases.map((value) => {
        value.expiryDate = new Date(value.expiryDate).toLocaleDateString();
        value.orderDate = new Date(value.orderDate).toLocaleDateString();
        value.purchaseDate = new Date(value.purchaseDate).toLocaleDateString();
        value.pricePerPackSize = formatter.format(+value.pricePerPackSize);
        value.totalPurchasePrice = formatter.format(
          <number>value.totalPurchasePrice
        );

        return value;
      });

      return this.purchases;
    },

    async fetchPurchaseById(purchaseId: string) {
      const response = await fetch(`${BASE_URL}/purchases/${purchaseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as PurchaseDto;
    },

    async fetchTodayPurchases(withId: boolean = false) {
      const response = await fetch(
        `${BASE_URL}/purchases?today=true&withId=${withId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as PurchaseDto[];
    },

    async addPurchase(payload: NewPurchaseDto) {
      const response = await fetch(`${BASE_URL}/purchases`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as PurchaseDto;
    },

    async fetchPurchaseProfitPercentage() {
      const response = await fetch(`${BASE_URL}/purchases?resource=profit`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.profitPercentage = data;

      return this.profitPercentage;
    },

    async updatePurchase(purchaseId: string, payload: UpdatePurchaseDto) {
      const response = await fetch(`${BASE_URL}/purchases/${purchaseId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as PurchaseDto;
    },

    async deletePurchase(purchaseId: string) {
      const response: Response = await fetch(
        `${BASE_URL}/purchases/${purchaseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken(),
          },
        }
      );

      if (response.status === 204) return "Deleted the purchase successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the purchase!");
        }
        return "Failed to delete the purchase!";
      }
    },

    async generatePurchasesReport() {
      await useFetchReport("purchases");
    },

    async getMonthlyReports() {
      const response: Response = await fetch(
        `${BASE_URL}/purchases/monthly-report`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data: MonthlySalesDto[] = await response.json();

      if (!response.ok) throw data as unknown as Error;

      return data.map((value) => {
        value.totalAmount = useCurrencyFormatter(+value.totalAmount).value;
        return value;
      });
    },
  },
});
