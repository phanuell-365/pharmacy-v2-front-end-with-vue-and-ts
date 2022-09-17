import { defineStore } from "pinia";
import { BASE_URL } from "@/constants/base-url";
import type { AuthDto } from "@/stores/auth/dto/auth.dto";
import { useStorage } from "@vueuse/core";
import { useTokenStore } from "@/stores/auth/token";

let timer: number;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
  }),
  actions: {
    async login(authDto: AuthDto) {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      const tokenStore = useTokenStore();

      tokenStore.storeTokenToLocalStorage(data?.access_token);

      const expiresInHours = Number.parseInt(data?.expires_in);
      const expiresIn = expiresInHours * 60 * 60 * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      useStorage("authData", {
        ...data,
        expirationDate,
      });

      timer = setTimeout(() => {
        this.logout();
        console.warn("Logging out ..");
      }, 3000);

      console.log(timer);
    },
    isAuthenticated() {
      const tokenStore = useTokenStore();

      return !!tokenStore.getStoredToken();
    },
    getLoggedInUserId(): string | undefined {
      const data = localStorage.getItem("authData");

      if (data) {
        const authData = JSON.parse(data);
        return authData.userId;
      }
      return undefined;
    },
    getUserRole(): string | undefined {
      const data = localStorage.getItem("authData");

      if (data) {
        const authData = JSON.parse(data);
        return authData.role;
      }
      return undefined;
    },
    isAdmin() {
      return this.getUserRole() === "admin";
    },
    isChiefPharmacist() {
      return this.getUserRole() === "chiefPharmacist";
    },
    isPharmacist() {
      return this.getUserRole() === "pharmacist";
    },
    isPharmacyTechnician() {
      return this.getUserRole() === "pharmacyTechnician";
    },
    isLoggedIn() {
      return this.isAuthenticated();
    },
    logout() {
      clearTimeout(timer);
      localStorage.removeItem("authData");
      localStorage.removeItem("token");
    },
  },
});