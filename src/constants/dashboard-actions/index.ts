import type { DashboardActionsItemProps } from "@/constants/dashboard-actions/interfaces";
import {
  INVENTORY_ICON,
  MEDICINE_ICON,
  NEW_MEDICINES_ICON,
  NEW_ORDER_ICON,
  NEW_SALES_ICON,
  NEW_SUPPLY_ICON,
  NEW_USER_ICON,
  ORDERS_ICON,
  SALES_ICON,
  SUPPLIES_ICON,
} from "@/constants/icons";

export const DashboardActions: DashboardActionsItemProps[] = [
  {
    text: "add new medicine",
    href: "/medicines/create",
    icon: NEW_MEDICINES_ICON,
  },
  {
    text: "add new customer",
    href: "/customers/create",
    icon: NEW_USER_ICON,
  },
  {
    text: "place an order",
    href: "/orders/create",
    icon: NEW_ORDER_ICON,
  },
  {
    text: "create new sale",
    href: "/sales/create",
    icon: NEW_SALES_ICON,
  },
  {
    text: "add new purchase",
    href: "/purchases/create",
    icon: NEW_SUPPLY_ICON,
  },
  {
    text: "order reports",
    href: "/orders",
    icon: ORDERS_ICON,
  },
  {
    text: "sales reports",
    href: "/sales",
    icon: SALES_ICON,
  },
  {
    text: "stock reports",
    href: "/medicines/stock",
    icon: INVENTORY_ICON,
  },
  {
    text: "purchase reports",
    href: "/purchases",
    icon: SUPPLIES_ICON,
  },
  {
    text: "out of stock reports",
    href: "/medicines/out-of-stock",
    icon: MEDICINE_ICON,
  },
];
