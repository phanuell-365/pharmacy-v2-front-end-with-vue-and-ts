import { USERS_ICON } from "@/constants/icons";
import type { AccordionItemProps } from "@/constants/sidebar/interfaces";

export const USERS_MENU: AccordionItemProps = {
  accordionHeaderDesc: "users",
  accordionHeaderId: "users",
  accordionIcon: USERS_ICON,
  accordionList: [
    {
      href: "/users/create",
      description: "add user",
      routeName: "add-user",
    },
    {
      href: "/users",
      description: "manage users",
      routeName: "manage-users",
    },
  ],
};
