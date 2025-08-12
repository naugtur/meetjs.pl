import { useTranslate } from '@tolgee/react';
import { MenuLink } from '@/content/menuLinks';

export const useTranslatedMenuLinks = (): MenuLink[] => {
  const { t } = useTranslate();

  return [
    {
      name: t('navigation.menu_items.30_years_js'),
      href: '/30-years-of-javascript',
      current: false,
      external: false,
    },
    {
      name: t('navigation.menu_items.summit'),
      href: 'https://summit.meetjs.pl',
      current: false,
      external: true,
    },
    {
      name: t('navigation.menu_items.cities'),
      href: '/events',
      current: false,
      external: false,
      dropdown: [
        {
          name: t('navigation.dropdown.all_cities'),
          href: '/events',
          type: 'link',
        },
        {
          name: 'separator',
          href: '#',
          type: 'separator',
        },
        {
          name: t('navigation.dropdown.cities_label'),
          href: '#',
          type: 'cities', // Special type to render cities list
        },
      ],
    },
    {
      name: t('navigation.menu_items.discounts'),
      href: '/discounts',
      current: false,
      external: false,
      dropdown: [
        {
          name: t('navigation.dropdown.all_discounts'),
          href: '/discounts',
          type: 'link',
        },
        {
          name: 'separator',
          href: '#',
          type: 'separator',
        },
        {
          name: t('navigation.dropdown.event_discounts'),
          href: '/discounts#events',
          type: 'link',
        },
        {
          name: t('navigation.dropdown.software_discounts'),
          href: '/discounts#software',
          type: 'link',
        },
        {
          name: t('navigation.dropdown.learning_discounts'),
          href: '/discounts#learning',
          type: 'link',
        },
      ],
    },
    {
      name: t('navigation.menu_items.about'),
      href: '/about',
      current: false,
      external: false,
      dropdown: [
        {
          name: t('navigation.dropdown.about_meetjs'),
          href: '/about',
          type: 'link',
        },
        {
          name: t('navigation.dropdown.our_team'),
          href: '/team',
          type: 'link',
          disabled: true,
        },
        {
          name: t('navigation.dropdown.sponsors'),
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
          name: t('navigation.dropdown.brand_assets'),
          href: '/brand',
          type: 'link',
        },
        {
          name: t('navigation.dropdown.code_of_conduct'),
          href: 'https://berlincodeofconduct.org/',
          external: true,
          type: 'link',
        },
      ],
    },
  ];
};

export const useTranslatedFooterMenuLinks = (): MenuLink[] => {
  const { t } = useTranslate();

  return [
    {
      name: t('navigation.menu_items.wdi_2025'),
      href: '/wdi',
      current: false,
      external: false,
    },
    {
      name: t('navigation.menu_items.summit'),
      href: 'https://summit.meetjs.pl',
      current: false,
      external: true,
    },
    { 
      name: t('navigation.events'), 
      href: '/events', 
      current: false, 
      external: false 
    },
    { 
      name: t('navigation.about'), 
      href: '/about', 
      current: false, 
      external: false 
    },
    {
      name: t('navigation.menu_items.14_birthday'),
      href: '/14-birthday',
      current: false,
      external: false,
    },
    { 
      name: t('navigation.menu_items.brand_assets'), 
      href: '/brand', 
      current: false, 
      external: false 
    },
    { 
      name: t('navigation.contact'), 
      href: '#', 
      current: false, 
      external: false 
    },
    {
      name: t('navigation.menu_items.code_of_conduct'),
      href: 'https://berlincodeofconduct.org/',
      current: false,
      external: true,
    },
  ];
};
