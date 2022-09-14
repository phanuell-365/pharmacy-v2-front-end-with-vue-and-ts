export interface AccordionListItemProps {
  href: string;
  description: string;
  routeName?: string;
}

export interface AccordionItemProps {
  accordionHeaderDesc: string;
  accordionHeaderId: string;
  accordionIcon: string;
  active?: boolean;
  accordionList: AccordionListItemProps[];
}
