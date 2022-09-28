import { defineStore } from "pinia";
import type {
  MedicineDto,
  NewMedicineDto,
  UpdateMedicineDto,
} from "@/stores/app/medicines/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

const MEDICINE_DEFAULT: MedicineDto = {
  id: "",
  name: "",
  doseForm: "",
  strength: "",
  levelOfUse: 0,
  therapeuticClass: "",
};

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
  getters: {
    getMedicineAttributes: (state) =>
      Object.keys(MEDICINE_DEFAULT).filter((value) => value !== "id"),
  },
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
      const response = await fetch(
        `${BASE_URL}/medicines?resource=dose-forms`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

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

    async fetchMedicineById(medicineId: string) {
      const response = await fetch(`${BASE_URL}/medicines/${medicineId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as MedicineDto;
    },

    async addMedicine(payload: NewMedicineDto) {
      const response = await fetch(`${BASE_URL}/medicines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as MedicineDto;
    },

    async updateMedicine(medicineId: string, payload: UpdateMedicineDto) {
      const response = await fetch(`${BASE_URL}/medicines/${medicineId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as MedicineDto;
    },

    async deleteMedicine(medicineId: string) {
      const response: Response = await fetch(
        `${BASE_URL}/medicines/${medicineId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken(),
          },
        }
      );

      if (response.status === 204) return "Deleted the medicine successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the medicine!");
        }
        return "Failed to delete the medicine!";
      }
    },
  },
});
