import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTokenStore = defineStore({
  id: "token",
  state: () => ({
    token: null,
  }),
  actions: {
    storeTokenToLocalStorage(_token: string) {
      if (this.getStoredToken()) {
        localStorage.removeItem("token");
      }

      useStorage("token", _token);
    },
    getStoredToken(): string {
      const data = localStorage.getItem("token");
      if (!data) {
        return "";
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return data;
    },
    clearToken() {
      const data = localStorage.getItem("token");
      if (data) {
        localStorage.removeItem("token");
      }
    },
  },
});
