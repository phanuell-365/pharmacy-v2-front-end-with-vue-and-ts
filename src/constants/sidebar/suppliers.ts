import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SUPPLIERS_ICON } from "@/constants/icons";

export const SUPPLIERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "suppliers",
  accordionHeaderId: "suppliers",
  accordionIcon: SUPPLIERS_ICON,
  accordionList: [
    {
      href: "/suppliers/create",
      description: "add supplier",
      routeName: "add-supplier",
    },
  ],
};
