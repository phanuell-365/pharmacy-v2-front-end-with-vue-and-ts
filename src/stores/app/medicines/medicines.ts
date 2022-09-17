import { defineStore } from "pinia";
import type { MedicineDto, NewMedicineDto } from "@/stores/app/medicines/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface MedicinesState {
  medicines: MedicineDto[];
  doseForms: string[];
  strengths: string[];
}

export const useMedicinesStore = defineStore({
  id: "medicines",
  state: (): MedicinesState => ({
    medicines: [],
    doseForms: [],
    strengths: [],
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

    async fetchMedicineDoseForms() {
      const response = await fetch(`${BASE_URL}/medicines?resource=dose-forms`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.doseForms = data as string[];

      return this.doseForms;
    },

    async fetchMedicineStrengths() {
      const response = await fetch(`${BASE_URL}/medicines?resource=strengths`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.strengths = data as string[];

      return this.strengths;
    },

    async addMedicine(payload: NewMedicineDto) {
      const response = await fetch(`${BASE_URL}/medicines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.message);

      return data as MedicineDto;
    }
  },
});
