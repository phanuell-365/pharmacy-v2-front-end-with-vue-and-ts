import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SALES_ICON } from "@/constants/icons";

export const SALES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "sales",
  accordionHeaderId: "sales",
  accordionIcon: SALES_ICON,
  accordionList: [
    {
      href: "/sales/create",
      description: "add sale",
      routeName: "add-sale",
    },
    {
      href: "/sales",
      description: "manage sales",
      routeName: "manage-sales",
    },
  ],
};
