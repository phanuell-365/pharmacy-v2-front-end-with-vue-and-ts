import { defineStore } from "pinia";
import type { NewStockDto, StockDto } from "@/stores/app/stock/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

const STOCKS_DEFAULT: StockDto = {
  id: "",
  medicine: "",
  issueUnitPrice: 0,
  issueQuantity: 0,
  // issueUnitPerPackSize: 0,
  // packSize: "",
  packSizePrice: 0,
  packSizeQuantity: 0,
  expirationDate: "",
};

interface StocksState {
  stocks: StockDto[];
}

export const useStocksStore = defineStore({
  id: "stocks",
  state: (): StocksState => ({
    stocks: [],
  }),
  getters: {
    getStockAttributes: (state) =>
      Object.keys(STOCKS_DEFAULT).filter((value) => value !== "id"),
  },
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

    async fetchExpiredStock() {
      const response = await fetch(`${BASE_URL}/stocks?cat=expired-stock`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      this.stocks = data as StockDto[];

      return this.stocks;
    },

    async addStock(payload: NewStockDto) {
      const response = await fetch(`${BASE_URL}/stocks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as StockDto;
    },
  },
});
