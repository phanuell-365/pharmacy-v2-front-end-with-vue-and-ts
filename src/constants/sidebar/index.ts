import { USERS_MENU } from "./users";
import { MEDICINES_MENU } from "@/constants/sidebar/medicines";
import { CUSTOMERS_MENU } from "@/constants/sidebar/customers";
import { HOME_MENU } from "@/constants/sidebar/home";
import { SALES_MENU } from "@/constants/sidebar/sales";
import { STOCKS_MENU } from "@/constants/sidebar/stocks";
import { SUPPLIERS_MENU } from "@/constants/sidebar/suppliers";

export const menu = [
  { ...HOME_MENU },
  { ...USERS_MENU },
  { ...CUSTOMERS_MENU },
  { ...MEDICINES_MENU },
  { ...SUPPLIERS_MENU },
  { ...SALES_MENU },
  { ...STOCKS_MENU },
];
