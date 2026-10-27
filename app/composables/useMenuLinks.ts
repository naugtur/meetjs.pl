import { useTranslate } from '@tolgee/vue';

export interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
  type?: 'link' | 'separator' | 'cities' | 'header';
  disabled?: boolean;
}

export interface MenuLink {
  name: string;
  href: string;
  current: boolean;
  external: boolean;
  dropdown?: DropdownItem[];
  highlight?: boolean;
}

/** Main navigation items (former useTranslatedMenuLinks). */
export const useMenuLinks = () => {
  const { t } = useTranslate();

  return computed<MenuLink[]>(() => [
    {
      name: t.value('navigation.menu_items.summit'),
      href: 'https://summit.meetjs.pl/2026',
      current: false,
      external: true,
      highlight: true,
    },
    {
      name: t.value('navigation.menu_items.speakers'),
      href: '/speakers',
      current: false,
      external: false,
    },
    {
      name: t.value('navigation.menu_items.passport'),
      href: '/passport',
      current: false,
      external: false,
    },
    {
      name: t.value('navigation.menu_items.cities'),
      href: '/events',
      current: false,
      external: false,
      dropdown: [
        {
          name: t.value('navigation.dropdown.all_cities'),
          href: '/events',
          type: 'link',
        },
        { name: 'separator', href: '#', type: 'separator' },
        {
          name: t.value('navigation.dropdown.cities_label'),
          href: '#',
          type: 'cities', // Special type to render cities list
        },
      ],
    },
    {
      name: t.value('navigation.menu_items.discounts'),
      href: '/discounts',
      current: false,
      external: false,
      dropdown: [
        {
          name: t.value('navigation.dropdown.all_discounts'),
          href: '/discounts',
          type: 'link',
        },
        { name: 'separator', href: '#', type: 'separator' },
        {
          name: t.value('navigation.dropdown.event_discounts'),
          href: '/discounts#events',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.software_discounts'),
          href: '/discounts#software',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.learning_discounts'),
          href: '/discounts#learning',
          type: 'link',
        },
      ],
    },
    {
      name: t.value('navigation.menu_items.about'),
      href: '/about',
      current: false,
      external: false,
      dropdown: [
        {
          name: t.value('navigation.dropdown.about_meetjs'),
          href: '/about',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.our_team'),
          href: '/team',
          type: 'link',
          disabled: true,
        },
        {
          name: t.value('navigation.dropdown.sponsors'),
          href: '/sponsors',
          type: 'link',
          disabled: true,
        },
        {
          name: t.value('navigation.dropdown.community_partnerships'),
          href: '/community-partnerships',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.media_coverage'),
          href: '/media',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.community_participation'),
          href: '/community',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.open_source'),
          href: '/open-source',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.organizer_tools'),
          href: '/organizers',
          type: 'link',
        },
        { name: 'separator', href: '#', type: 'separator' },
        {
          name: t.value('navigation.dropdown.brand_assets'),
          href: '/brand',
          type: 'link',
        },
        {
          name: t.value('navigation.dropdown.code_of_conduct'),
          href: 'https://berlincodeofconduct.org/',
          external: true,
          type: 'link',
        },
      ],
    },
  ]);
};

/** Footer menu items (former getTranslatedFooterMenuLinks). */
export const useFooterMenuLinks = () => {
  const { t } = useTranslate();

  return computed<MenuLink[]>(() => [
    {
      name: t.value('footer.menu_links.wdi_2025'),
      href: '/wdi',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.summit'),
      href: 'https://summit.meetjs.pl',
      current: false,
      external: true,
    },
    {
      name: t.value('footer.menu_links.events'),
      href: '/events',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.about'),
      href: '/about',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.organizer_tools'),
      href: '/organizers',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.14_birthday'),
      href: '/14-birthday',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.brand_assets'),
      href: '/brand',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.contact_link'),
      href: '#',
      current: false,
      external: false,
    },
    {
      name: t.value('footer.menu_links.code_of_conduct'),
      href: 'https://berlincodeofconduct.org/',
      current: false,
      external: true,
    },
  ]);
};
