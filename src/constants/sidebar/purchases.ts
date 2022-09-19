import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SUPPLIES_ICON } from "@/constants/icons";

export const PURCHASES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "purchases",
  accordionHeaderId: "purchases",
  accordionIcon: SUPPLIES_ICON,
  accordionList: [
    {
      href: "/purchases/create",
      description: "add purchase",
      routeName: "add-purchase"
    }
  ]
};
