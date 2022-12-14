import { defineStore } from "pinia";
import { useMedicinesStore } from "@/stores/app/medicines/medicines";

export interface CustomersOrders {
  id: string;
  medicine: string;
  doseForm: string;
  price: number;
  quantity: number;
  totalPrice: number;
  levelOfUse: number;
  expiryDate: string;
}

interface AddCustomerOrder {
  id: string;
  name: string;
  quantity: number;
}

interface CustomersOrdersState {
  items: CustomersOrders[];
  totalCost: number;
}

const EMPTY_CUS_ORDER: CustomersOrders = {
  id: "",
  medicine: "",
  doseForm: "",
  price: 0,
  quantity: 0,
  totalPrice: 0,
  levelOfUse: 0,
  expiryDate: "",
};

export const useCustomersOrdersStore = defineStore({
  id: "customers-orders",
  state: (): CustomersOrdersState => ({
    items: [],
    totalCost: 0,
  }),
  getters: {
    getItems: (state): CustomersOrders[] => state.items,
    getTotalCost: (state) => state.totalCost,
    getAttributes: () =>
      Object.keys(EMPTY_CUS_ORDER).filter((value) => value !== "id"),
    getItemNames: (state) => state.items.map((value) => value.medicine),
  },
  actions: {
    calculateItemTotalPrice(payload: { price: number; quantity: number }) {
      return payload.price * payload.quantity;
    },

    /**
     * @throws Error If the selected medicine's stock could not be found
     * @param payload
     */
    async addItem(payload: AddCustomerOrder) {
      const medicinesStore = useMedicinesStore();

      const medicine = await medicinesStore.fetchMedicineById(payload.id);

      const medicineStock = await medicinesStore.fetchMedicineStockById(
        payload.id
      );

      const itemTotalPrice = this.calculateItemTotalPrice({
        price: medicineStock.issueUnitSellingPrice,
        quantity: payload.quantity,
      });

      this.items.push({
        id: payload.id,
        medicine: medicine.name,
        doseForm: medicine.doseForm,
        price: medicineStock.issueUnitSellingPrice,
        quantity: payload.quantity,
        totalPrice: itemTotalPrice,
        levelOfUse: medicine.levelOfUse,
        expiryDate: new Date(medicineStock.expiryDate).toLocaleDateString(),
      });

      this.calculateTotalCost();
    },

    removeItem(medicineId: string) {
      this.items = this.items.filter((value) => value.id !== medicineId);
      this.calculateTotalCost();
    },

    calculateTotalCost() {
      const costs: number[] = this.items.map((value) => {
        return value.price * value.quantity;
      });

      this.totalCost = 0;

      costs.forEach((value) => {
        this.totalCost += value;
      });
    },

    updateItemQuantity(payload: { id: string; quantity: number }) {
      const medicineItem = this.items.find((value) => value.id === payload.id);

      if (medicineItem) {
        medicineItem.quantity = payload.quantity;
        medicineItem.totalPrice = this.calculateItemTotalPrice(medicineItem);
      }

      this.calculateTotalCost();
    },
  },
});
