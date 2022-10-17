import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { ORDERS_ICON } from "@/constants/icons";

export const ORDERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "orders",
  accordionHeaderId: "orders",
  accordionIcon: ORDERS_ICON,
  roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  accordionList: [
    {
      href: "/orders/create",
      description: "place an order",
      routeName: "add-order",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/orders",
      description: "manage orders",
      routeName: "manage-orders",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/orders/active",
      description: "active orders",
      routeName: "active-orders",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/orders/pending",
      description: "pending orders",
      routeName: "pending-orders",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/orders/delivered",
      description: "delivered orders",
      routeName: "delivered-orders",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/orders/cancelled",
      description: "cancelled orders",
      routeName: "cancelled-orders",
      roles: ["admin", "chiefPharmacist"],
    },
  ],
};
