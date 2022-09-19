import { defineStore } from "pinia";
import type { NewPurchaseDto, PurchaseDto } from "@/stores/app/purchases/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface PurchasesState {
  purchases: PurchaseDto[];
}

export const usePurchasesStore = defineStore({
  id: "purchases",
  state: (): PurchasesState => ({
    purchases: [],
  }),
  getters: {},
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchPurchases(): Promise<PurchaseDto[]> {
      const response = await fetch(`${BASE_URL}/purchases`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.purchases = data as PurchaseDto[];

      return this.purchases;
    },
    async fetchTodayPurchases() {
      const response = await fetch(`${BASE_URL}/purchases?today=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as PurchaseDto[];
    },

    async addPurchase(payload: NewPurchaseDto) {
      const response = await fetch(`${BASE_URL}/purchases`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as PurchaseDto;
    }
  },
});
