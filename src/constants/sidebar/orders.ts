import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { ORDERS_ICON } from "@/constants/icons";

export const ORDERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "orders",
  accordionHeaderId: "orders",
  accordionIcon: ORDERS_ICON,
  accordionList: [
    {
      href: "/orders/create",
      description: "place an order",
      routeName: "add-order",
    },
    {
      href: "/orders",
      description: "manage orders",
      routeName: "manage-orders",
    },
    {
      href: "/orders/active",
      description: "active orders",
      routeName: "active-orders",
    },
    {
      href: "/orders/pending",
      description: "pending orders",
      routeName: "pending-orders",
    },
    {
      href: "/orders/delivered",
      description: "delivered orders",
      routeName: "delivered-orders",
    },
    {
      href: "/orders/cancelled",
      description: "cancelled orders",
      routeName: "cancelled-orders",
    },
  ],
};
