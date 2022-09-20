import { defineStore } from "pinia";

interface CustomersOrders {
  medicineName: string;
  medicinePrice: number;
  medicineQuantity: number;
}

interface CustomersOrdersState {
  items: CustomersOrders[];
  totalCost: number;
}

export const useCustomersOrdersStore = defineStore({
  id: "customers-orders",
  state: (): CustomersOrdersState => ({
    items: [],
    totalCost: 0,
  }),
  getters: {
    getItems: (state) => state.items,
    getTotalCost: (state) => state.totalCost,
  },
  actions: {
    addItem(payload: CustomersOrders) {
      this.items.push(payload);
      this.calculateTotalCost();
    },
    removeItem(medicineName: string) {
      this.items = this.items.filter(
        (value) => value.medicineName !== medicineName
      );
      this.calculateTotalCost();
    },
    calculateTotalCost() {
      const costs: number[] = this.items.map((value) => {
        return value.medicinePrice * value.medicineQuantity;
      });

      this.totalCost = 0;

      costs.forEach((value) => {
        this.totalCost += value;
      });
    },
    updateItemQuantity(payload: { medicineName: string; newQuantity: number }) {
      const medicineItem = this.items.find(
        (value) => value.medicineName === payload.medicineName
      );

      if (medicineItem) {
        medicineItem.medicineQuantity = payload.newQuantity;
      }
    },
  },
});
