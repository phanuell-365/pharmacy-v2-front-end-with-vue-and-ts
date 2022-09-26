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

export interface ExpiredMedicine {
  name: string;
  doseForm: string;
  strength: string;
  levelOfUse: number;
  therapeuticClass: string;
  expiryDate: string;
}

export interface OutOfStockMedicine {
  name: string;
  doseForm: string;
  strength: string;
  levelOfUse: number;
  therapeuticClass: string;
  packSizeQuantity: string;
  issueQuantity: number;
}

const EXPIRED_MEDICINE_DEFAULT: ExpiredMedicine = {
  name: "",
  doseForm: "",
  strength: "",
  levelOfUse: 0,
  therapeuticClass: "",
  expiryDate: "",
};

const OUT_OF_STOCK_MEDICINE: OutOfStockMedicine = {
  name: "",
  doseForm: "",
  strength: "",
  levelOfUse: 0,
  therapeuticClass: "",
  packSizeQuantity: "",
  issueQuantity: 0,
};

export const useStocksStore = defineStore({
  id: "stocks",
  state: (): StocksState => ({
    stocks: [],
  }),
  getters: {
    getStockAttributes: (state) =>
      Object.keys(STOCKS_DEFAULT).filter((value) => value !== "id"),
    getExpiredMedicinesAttributes: (state) =>
      Object.keys(EXPIRED_MEDICINE_DEFAULT).filter((value) => value !== "id"),
    getOutOfStockMedicinesAttributes: (state) =>
      Object.keys(OUT_OF_STOCK_MEDICINE).filter((value) => value !== "id"),
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

    async fetchOutOfStock() {
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

    async fetchMedicineOutOfStock() {
      const response = await fetch(
        `${BASE_URL}/stocks?cat=medicine-out-of-stock`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      return data as OutOfStockMedicine[];
    },

    async fetchExpiredMedicines() {
      const response = await fetch(`${BASE_URL}/stocks?cat=expired-medicines`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      return data as ExpiredMedicine[];
    },
  },
});
