import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { PATIENTS_ICON } from "@/constants/icons";

export const CUSTOMERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "customers",
  accordionHeaderId: "customers",
  accordionIcon: PATIENTS_ICON,
  roles: [
    "admin",
    "pharmacist",
    "pharmacistAssistant",
    "chiefPharmacist",
    "pharmacyTechnician",
  ],
  accordionList: [
    {
      href: "/customers/create",
      description: "add customer",
      routeName: "add-customer",
      roles: [
        "admin",
        "chiefPharmacist",
        "pharmacistAssistant",
        "pharmacyTechnician",
      ],
    },
    {
      href: "/customers",
      description: "manage customers",
      routeName: "manage-customers",
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
