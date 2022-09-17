import { defineStore } from "pinia";
import type { SupplierDto } from "@/stores/app/suppliers/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";

interface SuppliersState {
  suppliers: SupplierDto[];
}

export const useSuppliersStore = defineStore({
  id: "suppliers",
  state: (): SuppliersState => ({
    suppliers: [],
  }),
  getters: {},
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
  },
});