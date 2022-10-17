import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SUPPLIES_ICON } from "@/constants/icons";

export const PURCHASES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "purchases",
  accordionHeaderId: "purchases",
  accordionIcon: SUPPLIES_ICON,
  roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  accordionList: [
    {
      href: "/purchases/create",
      description: "add purchase",
      routeName: "add-purchase",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/purchases",
      description: "manage purchases",
      routeName: "manage-purchases",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
  ],
};
