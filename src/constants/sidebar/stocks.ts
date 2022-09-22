import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { INVENTORY_ICON } from "@/constants/icons";

export const STOCKS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "stock",
  accordionHeaderId: "stocks",
  accordionIcon: INVENTORY_ICON,
  accordionList: [
    {
      href: "/stocks/create",
      description: "add stock",
      routeName: "add-stock",
    },
    {
      href: "/stocks",
      description: "manage stock",
      routeName: "manage-stocks",
    },
  ],
};
