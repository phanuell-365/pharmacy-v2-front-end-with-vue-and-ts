import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SUPPLIERS_ICON } from "@/constants/icons";

export const SUPPLIERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "suppliers",
  accordionHeaderId: "suppliers",
  accordionIcon: SUPPLIERS_ICON,
  roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
  accordionList: [
    {
      href: "/suppliers/create",
      description: "add supplier",
      routeName: "add-supplier",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
    {
      href: "/suppliers",
      description: "manage suppliers",
      routeName: "manage-suppliers",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
    },
  ],
};
