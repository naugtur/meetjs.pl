export interface MenuLink {
  name: string;
  href: string;
  current: boolean;
  external: boolean;
  dropdown?: DropdownItem[];
  highlight?: boolean;
}

export interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
  type?: 'link' | 'separator' | 'cities' | 'header';
  disabled?: boolean;
}
