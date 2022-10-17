import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { HOME_ICON } from "@/constants/icons";

export const HOME_MENU: AccordionItemProps = {
  accordionHeaderDesc: "home",
  accordionHeaderId: "home",
  accordionIcon: HOME_ICON,
  roles: [
    "admin",
    "pharmacist",
    "pharmacistAssistant",
    "chiefPharmacist",
    "pharmacyTechnician",
  ],
  accordionList: [
    {
      href: "/dashboard",
      description: "dashboard",
      routeName: "dashboard",
      roles: [
        "admin",
        "pharmacist",
        "pharmacistAssistant",
        "chiefPharmacist",
        "pharmacyTechnician",
      ],
    },
  ],
};
