import { defineStore } from "pinia";
import { menu } from "@/constants/sidebar";
import type {
  AccordionItemProps,
  AccordionListItemProps,
} from "@/constants/sidebar/interfaces";

interface SidebarMenu {
  sidebarMenu: AccordionItemProps[];
  sidebarSubMenu?: AccordionListItemProps;
}

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: (): SidebarMenu => ({
    sidebarMenu: menu,
    sidebarSubMenu: undefined,
  }),
  getters: {
    getSidebarSubMenu: (state) => state.sidebarSubMenu,
    getSidebarMenuName: (state) =>
      state.sidebarMenu.find((value) => value.active)?.accordionHeaderDesc,
  },
  actions: {
    setUpSidebarMenu(routeName: string) {
      const sidebar = this.sidebarMenu.find(
        (value) =>
          (this.sidebarSubMenu = value.accordionList.find(
            (value1) => value1.routeName === routeName
          ))
      );

      if (sidebar) sidebar.active = true;

      return sidebar;
    },
  },
});
