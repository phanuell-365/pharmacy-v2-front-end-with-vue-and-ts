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
  ],
};
