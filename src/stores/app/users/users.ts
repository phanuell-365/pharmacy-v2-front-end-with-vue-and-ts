import { defineStore } from "pinia";
import type { NewUserDto, UserDto } from "@/stores/app/users/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import startCase from "lodash/startCase";
import has from "lodash/has";

interface UsersState {
  users: UserDto[];
  usersRoles: string[];
}

export const useUsersStore = defineStore({
  id: "users",
  state: (): UsersState => ({
    users: [],
    usersRoles: [],
  }),
  actions: {
    getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchUsers() {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const tokenStore = useTokenStore();
          tokenStore.clearToken();
        }
        throw new Error(data?.message);
      }

      this.users = data as UserDto[];

      return data as UserDto[];
    },
    async fetchUserById(userId: string) {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const tokenStore = useTokenStore();
          tokenStore.clearToken();
        }
        throw new Error(data?.message);
      }

      return data as UserDto;
    },
    async generateUsersReports() {
      const response: Response = await fetch(`${BASE_URL}/reports/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
          "Content-Disposition": "attachment;filename=users-reports.pdf",
        },
        redirect: "follow",
      });

      if (!response.ok) {
        if (response.status === 401) {
          const tokenStore = useTokenStore();
          tokenStore.clearToken();
        }
        throw new Error("Failed to load the report");
      }

      const blob = await response.blob();

      const file = window.URL.createObjectURL(blob);

      window.location.assign(file);

      // Response.redirect("http://localhost:5173/users/reports/view", 200)

      // await fetch("http://localhost:5173/users/reports", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/pdf",
      //     "Content-Disposition": "attachment;filename=users-reports.pdf",
      //   },
      //   mode: "same-origin",
      //   body: response,
      // });

      if (response.body) {
        const streams = response.body.tee();

        streams.forEach((value) => {
          console.log(value);
        });
      }

      console.log(response);

      return response;
    },
    async fetchUsersRoles() {
      const response: Response = await fetch(
        `${BASE_URL}/users?resource=roles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Unauthorized") {
          throw new Error(data.message + "! Failed to fetch user's roles!");
        }
        throw new Error(data.message);
      }

      [...(data as string[])].forEach((item) => {
        if (has(this.usersRoles, item)) this.usersRoles.push(startCase(item));
      });

      return data;
    },
    async addUser(payload: NewUserDto): Promise<{ status: boolean }> {
      const response: Response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Unauthorized") {
          throw new Error(data.message + "! Failed to add the user!");
        }
        throw new Error(data.message);
      }

      return { status: true };
    },
  },
});
