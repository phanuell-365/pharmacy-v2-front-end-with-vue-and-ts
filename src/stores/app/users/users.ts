import { defineStore } from "pinia";
import type {
  NewUserDto,
  UpdateUserDto,
  UserDto,
} from "@/stores/app/users/dto";
import { useTokenStore } from "@/stores/auth/token";
import { BASE_URL } from "@/constants/base-url";
import startCase from "lodash/startCase";
import has from "lodash/has";
import { useFetchReport } from "@/composables/use-fetch-report";

const USER_DEFAULT: UserDto = {
  id: "",
  username: "",
  email: "",
  phone: "",
  role: "",
};

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
  getters: {
    getUserAttributes: (state) =>
      Object.keys(USER_DEFAULT).filter((value) => value !== "id"),
  },
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
        throw data as Error;
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
        throw data as Error;
      }

      return data as UserDto;
    },

    async generateUsersReports() {
      return await useFetchReport("users");
    },
    async fetchUsersRoles(filter: boolean = false) {
      const response: Response = await fetch(
        `${BASE_URL}/users/search?resource=roles&filter=${filter}`,
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
    async addUser(payload: NewUserDto): Promise<UserDto> {
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

      return data as UserDto;
    },

    async updateUser(userId: string, payload: UpdateUserDto) {
      const response: Response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Unauthorized") {
          throw new Error(data.message + "! Failed to update the user!");
        }
        throw new Error(data.message);
      }

      return data as UserDto;
    },

    async deleteUser(userId: string) {
      const response: Response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken(),
        },
      });

      // let data;
      //
      // if (response.body) {
      //   data = await response.json();
      // }
      if (response.status === 204) return "Deleted the user successfully!";
      else if (!response.ok) {
        let data;

        if (response.body) {
          data = await response.json();

          throw new Error(data.message + "! Failed to delete the user!");
        }
        return "Failed to delete the user!";
      }
      // else if (!response.ok) {
      //   if (data.message === "Unauthorized") {
      //     throw new Error(data.message + "! Failed to delete the user!");
      //   }
      //   throw new Error(data.message);
      // }
    },
  },
});
