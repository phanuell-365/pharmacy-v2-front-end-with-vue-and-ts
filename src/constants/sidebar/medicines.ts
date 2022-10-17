import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { MEDICINE_ICON } from "@/constants/icons";

export const MEDICINES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "medicines",
  accordionHeaderId: "medicines",
  accordionIcon: MEDICINE_ICON,
  roles: [
    "admin",
    "pharmacist",
    "pharmacistAssistant",
    "chiefPharmacist",
    "pharmacyTechnician",
  ],
  accordionList: [
    {
      href: "/medicines/create",
      description: "add medicine",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
      routeName: "add-medicine",
    },
    {
      href: "/medicines",
      description: "manage medicines",
      routeName: "manage-medicines",
      roles: [
        "admin",
        "pharmacist",
        "pharmacistAssistant",
        "chiefPharmacist",
        "pharmacyTechnician",
      ],
    },
    {
      href: "/medicines/stock",
      description: "manage stock",
      routeName: "medicines-stock",
      roles: [
        "admin",
        "pharmacist",
        "pharmacistAssistant",
        "chiefPharmacist",
        "pharmacyTechnician",
      ],
    },
    {
      href: "/medicines/expired",
      description: "expired stock",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
      routeName: "expired-stock",
    },
    {
      href: "/medicines/order",
      description: "place order",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
      routeName: "place-medicine-order",
    },
    {
      href: "/medicines/out-of-stock",
      roles: ["admin", "chiefPharmacist", "pharmacistAssistant"],
      description: "out of stock",
      routeName: "medicines-out-of-stock",
    },
  ],
};
