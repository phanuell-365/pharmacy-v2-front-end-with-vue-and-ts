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
  PATIENTS_ICON,
  SALES_ICON,
  SUPPLIES_ICON,
} from "@/constants/icons";

export const DashboardActions: DashboardActionsItemProps[] = [
  {
    text: "add new medicine",
    href: "/medicines/create",
    icon: NEW_MEDICINES_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
  {
    text: "add new customer",
    href: "/customers/create",
    icon: NEW_USER_ICON,
    roles: [
      "admin",
      "chiefPharmacist",
      "pharmacistAssistant",
      "pharmacyTechnician",
    ],
  },
  {
    text: "place an order",
    href: "/orders/create",
    icon: NEW_ORDER_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
  {
    text: "create new sale",
    href: "/sales/create",
    icon: NEW_SALES_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
  },
  {
    text: "add new purchase",
    href: "/purchases/create",
    icon: NEW_SUPPLY_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
  {
    text: "manage medicines",
    href: "/medicines",
    icon: MEDICINE_ICON,
    roles: ["pharmacistAssistant", "pharmacist"],
  },
  {
    text: "manage customers",
    href: "/customers",
    icon: PATIENTS_ICON,
    roles: ["pharmacist", "pharmacistAssistant", "pharmacyTechnician"],
  },
  {
    text: "medicines reports",
    href: "/medicines",
    icon: MEDICINE_ICON,
    roles: ["pharmacist"],
  },
  {
    text: "customers reports",
    href: "/customers",
    icon: PATIENTS_ICON,
    roles: ["pharmacist"],
  },
  {
    text: "order reports",
    href: "/orders",
    icon: ORDERS_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
  {
    text: "sales reports",
    href: "/sales",
    icon: SALES_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
  },
  {
    text: "stock reports",
    href: "/medicines/stock",
    icon: INVENTORY_ICON,
    roles: [
      "admin",
      "pharmacist",
      "pharmacistAssistant",
      "chiefPharmacist",
      "pharmacyTechnician",
    ],
  },
  {
    text: "purchase reports",
    href: "/purchases",
    icon: SUPPLIES_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
  {
    text: "out of stock reports",
    href: "/medicines/out-of-stock",
    icon: MEDICINE_ICON,
    roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  },
];
