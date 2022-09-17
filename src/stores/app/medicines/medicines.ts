import { defineStore } from "pinia";
import type { MedicineDto } from "@/stores/app/medicines/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface MedicinesState {
  medicines: MedicineDto[];
}

export const useMedicinesStore = defineStore({
  id: "medicines",
  state: (): MedicinesState => ({
    medicines: [],
  }),
  getters: {},
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchMedicines(): Promise<MedicineDto[]> {
      const response = await fetch(`${BASE_URL}/medicines`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.medicines = data as MedicineDto[];

      return this.medicines;
    },
  },
});
