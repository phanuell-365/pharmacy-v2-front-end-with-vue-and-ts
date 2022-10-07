import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { MEDICINE_ICON } from "@/constants/icons";

export const MEDICINES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "medicines",
  accordionHeaderId: "medicines",
  accordionIcon: MEDICINE_ICON,
  accordionList: [
    {
      href: "/medicines/create",
      description: "add medicine",
      routeName: "add-medicine",
    },
    {
      href: "/medicines",
      description: "manage medicines",
      routeName: "manage-medicines",
    },
    {
      href: "/medicines/stock",
      description: "manage stock",
      routeName: "medicines-stock",
    },
    {
      href: "/medicines/expired",
      description: "expired stock",
      routeName: "expired-stock",
    },
    {
      href: "/medicines/order",
      description: "place order",
      routeName: "place-medicine-order",
    },
    {
      href: "/medicines/out-of-stock",
      description: "out of stock",
      routeName: "medicines-out-of-stock",
    },
  ],
};
