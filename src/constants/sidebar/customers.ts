import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { PATIENTS_ICON } from "@/constants/icons";

export const CUSTOMERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "customers",
  accordionHeaderId: "customers",
  accordionIcon: PATIENTS_ICON,
  accordionList: [
    {
      href: "/customers/create",
      description: "add customer",
      routeName: "add-customer",
    },
    {
      href: "/customers",
      description: "view customers",
      routeName: "view-customers",
    },
    {
      href: "/customers/update",
      description: "manage customers",
      routeName: "manage-customers",
    },
  ],
};
