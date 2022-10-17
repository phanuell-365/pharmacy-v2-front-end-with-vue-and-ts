import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { SALES_ICON } from "@/constants/icons";

export const SALES_MENU: AccordionItemProps = {
  accordionHeaderDesc: "sales",
  accordionHeaderId: "sales",
  accordionIcon: SALES_ICON,
  roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
  accordionList: [
    {
      href: "/sales/create",
      description: "add sale",
      routeName: "add-sale",
      roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
    },
    {
      href: "/sales",
      description: "manage sales",
      routeName: "manage-sales",
      roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
    },
    {
      href: "/sales/issued",
      description: "issued sales",
      routeName: "issued-sales",
      roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
    },
    {
      href: "/sales/pending",
      description: "pending sales",
      routeName: "pending-sales",
      roles: ["admin", "chiefPharmacist", "pharmacyTechnician"],
    },
    {
      href: "/sales/cancelled",
      description: "cancelled sales",
      routeName: "cancelled-sales",
      roles: ["admin", "chiefPharmacist"],
    },
  ],
};
