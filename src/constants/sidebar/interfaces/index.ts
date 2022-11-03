export interface AccordionListItemProps {
  href: string;
  description: string;
  routeName?: string;
  roles: string[];
}

export interface AccordionItemProps {
  accordionHeaderDesc: string;
  accordionHeaderId: string;
  accordionIcon: string;
  active?: boolean;
  roles: string[];
  accordionList: AccordionListItemProps[];
}
