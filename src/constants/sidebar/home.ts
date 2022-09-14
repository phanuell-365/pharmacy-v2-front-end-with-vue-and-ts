import type { AccordionItemProps } from "@/constants/sidebar/interfaces";
import { HOME_ICON } from "@/constants/icons";

export const HOME_MENU: AccordionItemProps = {
  accordionHeaderDesc: "home",
  accordionHeaderId: "home",
  accordionIcon: HOME_ICON,
  accordionList: [
    {
      href: "/dashboard",
      description: "dashboard",
      routeName: "dashboard",
    },
  ],
};
