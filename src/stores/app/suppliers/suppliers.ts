import { defineStore } from "pinia";
import type { NewSupplierDto, SupplierDto } from "@/stores/app/suppliers/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

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
  },
});
