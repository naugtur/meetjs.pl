import { getTranslate } from '@/tolgee/server';
import { MenuLink } from '@/content/menuLinks';

// Server-side function for translated footer menu links
export const getTranslatedFooterMenuLinks = async (): Promise<MenuLink[]> => {
  const t = await getTranslate();

  return [
    {
      name: t('footer.menu_links.wdi_2025'),
      href: '/wdi',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.summit'),
      href: 'https://summit.meetjs.pl',
      current: false,
      external: true,
    },
    {
      name: t('footer.menu_links.events'),
      href: '/events',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.about'),
      href: '/about',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.organizer_tools'),
      href: '/organizers',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.14_birthday'),
      href: '/14-birthday',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.brand_assets'),
      href: '/brand',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.contact_link'),
      href: '#',
      current: false,
      external: false,
    },
    {
      name: t('footer.menu_links.code_of_conduct'),
      href: 'https://berlincodeofconduct.org/',
      current: false,
      external: true,
    },
  ];
};
