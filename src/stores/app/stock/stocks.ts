import { defineStore } from "pinia";
import type { StockDto } from "@/stores/app/stock/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface StocksState {
  stocks: StockDto[];
}

export const useStocksStore = defineStore({
  id: "stocks",
  state: (): StocksState => ({
    stocks: [],
  }),
  getters: {},
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchStocks(): Promise<StockDto[]> {
      const response = await fetch(`${BASE_URL}/stocks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      this.stocks = data as StockDto[];

      return this.stocks;
    },

    async fetchMedicinesOutOfStock() {
      const response = await fetch(`${BASE_URL}/stocks?cat=out-of-stock`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      this.stocks = data as StockDto[];

      return this.stocks;
    },
  },
});
