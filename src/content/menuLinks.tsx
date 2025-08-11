export interface MenuLink {
  name: string;
  href: string;
  current: boolean;
  external: boolean;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
  type?: 'link' | 'separator' | 'cities' | 'header';
  disabled?: boolean;
}

export const menuLinks: MenuLink[] = [
  {
    name: '🎉 30 Years of JS',
    href: '/30-years-of-javascript',
    current: false,
    external: false,
  },
  {
    name: 'summit',
    href: 'https://summit.meetjs.pl',
    current: false,
    external: true,
  },
  {
    name: '🏙️ cities',
    href: '/events',
    current: false,
    external: false,
    dropdown: [
      {
        name: 'All Cities',
        href: '/events',
        type: 'link',
      },
      {
        name: 'separator',
        href: '#',
        type: 'separator',
      },
      {
        name: 'Cities',
        href: '#',
        type: 'cities', // Special type to render cities list
      },
    ],
  },
  {
    name: '💰 discounts',
    href: '/discounts',
    current: false,
    external: false,
    dropdown: [
      {
        name: 'All Discounts',
        href: '/discounts',
        type: 'link',
      },
      {
        name: 'separator',
        href: '#',
        type: 'separator',
      },
      {
        name: 'Event Discounts',
        href: '/discounts#events',
        type: 'link',
      },
      {
        name: 'Software Discounts',
        href: '/discounts#software',
        type: 'link',
      },
      {
        name: 'Learning Discounts',
        href: '/discounts#learning',
        type: 'link',
      },
    ],
  },
  {
    name: '💼 jobs',
    href: '/jobs',
    current: false,
    external: false,
  },
  {
    name: 'about',
    href: '/about',
    current: false,
    external: false,
    dropdown: [
      {
        name: 'About meet.js',
        href: '/about',
        type: 'link',
      },
      {
        name: 'Our Team',
        href: '/team',
        type: 'link',
        disabled: true,
      },
      {
        name: 'Sponsors',
        href: '/sponsors',
        type: 'link',
        disabled: true,
      },
      {
        name: 'separator',
        href: '#',
        type: 'separator',
      },
      {
        name: 'Brand Assets',
        href: '/brand',
        type: 'link',
      },
      {
        name: 'Code of Conduct',
        href: 'https://berlincodeofconduct.org/',
        external: true,
        type: 'link',
      },
    ],
  },
];

export const footerMenuLinks: MenuLink[] = [
  {
    name: 'WDI 2025',
    href: '/wdi',
    current: false,
    external: false,
  },
  {
    name: 'summit',
    href: 'https://summit.meetjs.pl',
    current: false,
    external: true,
  },
  { name: 'events', href: '/events', current: false, external: false },
  { name: 'about', href: '/about', current: false, external: false },
  {
    name: '14 birthday',
    href: '/14-birthday',
    current: false,
    external: false,
  },
  { name: 'brand assets', href: '/brand', current: false, external: false },
  { name: 'contact', href: '#', current: false, external: false },
  {
    name: 'code of conduct',
    href: 'https://berlincodeofconduct.org/',
    current: false,
    external: true,
  },
];
