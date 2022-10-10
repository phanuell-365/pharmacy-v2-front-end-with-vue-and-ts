import { defineStore } from "pinia";
import type {
  NewSupplierDto,
  SupplierDto,
  UpdateSupplierDto,
} from "@/stores/app/suppliers/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import { useFetchReport } from "@/composables/use-fetch-report";

const SUPPLIER_DEFAULT: SupplierDto = {
  id: "",
  name: "",
  email: "",
  phone: "",
};

interface SuppliersState {
  suppliers: SupplierDto[];
}

export const useSuppliersStore = defineStore({
  id: "suppliers",
  state: (): SuppliersState => ({
    suppliers: [],
  }),
  getters: {
    getSupplierAttributes: (state) =>
      Object.keys(SUPPLIER_DEFAULT).filter((value) => value !== "id"),
  },
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },

    async fetchSuppliers(): Promise<SupplierDto[]> {
      const response = await fetch(`${BASE_URL}/suppliers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      this.suppliers = data as SupplierDto[];

      return this.suppliers;
    },

    async addSupplier(payload: NewSupplierDto) {
      const response = await fetch(`${BASE_URL}/suppliers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SupplierDto;
    },

    async fetchSupplierById(supplierId: string) {
      const response = await fetch(`${BASE_URL}/suppliers/${supplierId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SupplierDto;
    },

    async updateSupplier(supplierId: string, payload: UpdateSupplierDto) {
      const response = await fetch(`${BASE_URL}/suppliers/${supplierId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message);

      return data as SupplierDto;
    },

    async deleteSupplier(supplierId: string) {
      const response: Response = await fetch(
        `${BASE_URL}/suppliers/${supplierId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken(),
          },
        }
      );

      if (response.status === 204) return "Deleted the supplier successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the supplier!");
        }
        return "Failed to delete the supplier!";
      }
    },

    async generateSuppliersReport() {
      return await useFetchReport("suppliers");
    },
  },
});
