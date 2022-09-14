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
      description: "view medicines",
      routeName: "view-medicines",
    },
    {
      href: "/medicines/update",
      description: "manage medicines",
      routeName: "manage-medicines",
    },
    {
      href: "/medicines/expired",
      description: "expired medicines",
      routeName: "expired-medicines",
    },
    {
      href: "/medicines/order",
      description: "place order",
      routeName: "place-medicine-order",
    },
    {
      href: "/medicines?drugs=out-of-stock",
      description: "out of stock",
      routeName: "out-of-stock",
    },
  ],
};
