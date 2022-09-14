import { USERS_MENU } from "./users";
import { MEDICINES_MENU } from "@/constants/sidebar/medicines";
import { CUSTOMERS_MENU } from "@/constants/sidebar/customers";
import { HOME_MENU } from "@/constants/sidebar/home";

export const menu = [
  { ...HOME_MENU },
  { ...USERS_MENU },
  { ...CUSTOMERS_MENU },
  { ...MEDICINES_MENU },
];
