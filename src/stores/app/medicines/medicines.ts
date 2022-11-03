import { defineStore } from "pinia";
import type {
  MedicineDto,
  NewMedicineDto,
  UpdateMedicineDto,
} from "@/stores/app/medicines/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import type { MedicineStockDto } from "@/stores/app/medicines/dto/medicine-stock.dto";
import type { ExpiredMedicineDto } from "@/stores/app/medicines/dto/expired-medicine.dto";
import type { MedicineOutOfStockDto } from "@/stores/app/medicines/dto/medicine-out-of-stock.dto";
import { useFetchReport } from "@/composables/use-fetch-report";
import { useCurrencyFormatter } from "@/composables/currency-formatter";

const MEDICINE_DEFAULT: MedicineDto = {
  id: "",
  name: "",
  doseForm: "",
  strength: "",
  levelOfUse: 0,
  therapeuticClass: "",
  packSize: "",
};

const MEDICINE_STOCK_DEFAULT: MedicineStockDto = {
  id: "",
  name: "",
  packSize: "",
  // issueUnitPurchasePrice: 0,
  issueUnitSellingPrice: 0,
  issueUnitQuantity: 0,
  issueUnitPerPackSize: 0,
  // profitPerIssueUnit: 0,
  // packSizePurchasePrice: 0,
  // packSizeSellingPrice: 0,
  packSizeQuantity: 0,
  // profitPerPackSize: 0,
  expiryDate: "",
};

const EXPIRED_MEDICINE_DEFAULT: ExpiredMedicineDto = {
  name: "",
  packSizeQuantity: 0,
  issueUnitQuantity: 0,
  issueUnitPerPackSize: 0,
  issueUnitSellingPrice: 0,
  expiryDate: "",
};

const MEDICINE_OUT_OF_STOCK: MedicineOutOfStockDto = {
  name: "",
  packSize: "",
  packSizeQuantity: 0,
  packSizePurchasePrice: 0,
  issueUnitQuantity: 0,
  issueUnitPerPackSize: 0,
  issueUnitSellingPrice: 0,
  expiryDate: "",
};

interface MedicinesState {
  medicines: MedicineDto[];
  medicineStock: MedicineStockDto[];
  doseForms: string[];
  strengths: string[];
}

export const useMedicinesStore = defineStore({
  id: "medicines",
  state: (): MedicinesState => ({
    medicines: [],
    medicineStock: [],
    doseForms: [],
    strengths: [],
  }),
  getters: {
    getMedicineAttributes: () =>
      Object.keys(MEDICINE_DEFAULT).filter((value) => value !== "id"),
    getExpiredMedicinesAttributes: () =>
      Object.keys(EXPIRED_MEDICINE_DEFAULT).filter((value) => value !== "id"),
    getMedicineStockAttributes: () =>
      Object.keys(MEDICINE_STOCK_DEFAULT).filter((value) => value !== "id"),
    getMedicineOutOfStockAttributes: () =>
      Object.keys(MEDICINE_OUT_OF_STOCK).filter((value) => value !== "id"),
  },
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchMedicines(paranoid: boolean = true): Promise<MedicineDto[]> {
      const response = await fetch(
        `${BASE_URL}/medicines?paranoid=${paranoid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.medicines = data as MedicineDto[];
      this.medicineStock = data as MedicineStockDto[];

      this.medicineStock = this.medicineStock.map((value) => {
        value.expiryDate = new Date(value.expiryDate).toLocaleDateString();

        return value;
      });

      return this.medicines;
    },

    async fetchMedicinesOutOfStock() {
      const response = await fetch(
        `${BASE_URL}/medicines?resource=out-of-stock`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data: MedicineOutOfStockDto[] = await response.json();

      return data.map((value) => {
        value.expiryDate = new Date(value.expiryDate).toLocaleDateString();

        return value;
      });
    },

    async fetchExpiredMedicines() {
      const response = await fetch(`${BASE_URL}/medicines?resource=expired`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data: ExpiredMedicineDto[] = await response.json();

      return data.map((value) => {
        value.expiryDate = new Date(value.expiryDate).toLocaleDateString();
        value.issueUnitSellingPrice = useCurrencyFormatter(
          +value.issueUnitSellingPrice
        ).value;
        return value;
      });
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

      if (!response.ok) throw data as Error;

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

      if (!response.ok) throw data as Error;

      this.strengths = data as string[];

      return this.strengths;
    },

    async fetchMedicineById(medicineId: string, paranoid: boolean = true) {
      const response = await fetch(
        `${BASE_URL}/medicines/${medicineId}?paranoid=${paranoid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as MedicineDto;
    },

    async fetchMedicineStockById(medicineId: string) {
      const response = await fetch(`${BASE_URL}/medicines/${medicineId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as MedicineStockDto;
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

      if (!response.ok) throw data as Error;

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

      if (!response.ok) throw data as Error;

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

    async generateMedicinesReport() {
      return await useFetchReport("medicines");
    },

    async generateMedicinesStockReport() {
      return await useFetchReport("medicines/stock");
    },

    async generateOutOfStockReport() {
      return await useFetchReport("medicines/out-of-stock");
    },

    async generateExpiredStockReport() {
      return await useFetchReport("medicines/expired");
    },
  },
});
