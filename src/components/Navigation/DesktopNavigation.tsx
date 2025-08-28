import { FaChevronDown, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CITIES } from '@/content/cities';
import { NavigationLink } from './NavigationLink';
import { CityStatusIndicator } from './CityStatusIndicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import type { Route } from 'next';
import { useTranslate } from '@tolgee/react';
import { useTranslatedMenuLinks } from '@/hooks/useTranslatedMenuLinks';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export const DesktopNavigation = () => {
  const { t } = useTranslate();
  const menuLinks = useTranslatedMenuLinks();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden sm:flex"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
      role="navigation"
    >
      <ul className="flex items-center justify-center gap-4" role="menubar">
        {menuLinks.map((item) => (
          <li key={item.name} role="none">
            {item.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.name}
                  <FaChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={
                    item.name === 'events'
                      ? 'max-h-[60vh] w-56 overflow-y-auto'
                      : 'w-56'
                  }
                >
                  {item.dropdown.map((dropdownItem, index) => {
                    if (dropdownItem.type === 'separator') {
                      return <DropdownMenuSeparator key={index} />;
                    }

                    if (dropdownItem.type === 'cities') {
                      return (
                        <div key={index}>
                          <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {t('navigation.dropdown.cities_label')}
                          </DropdownMenuLabel>
                          {CITIES.sort((a, b) =>
                            a.name.localeCompare(b.name),
                          ).map((city) => (
                            <DropdownMenuItem key={city.name} asChild>
                              <Link
                                href={city.href as Route}
                                className="flex items-center justify-between"
                              >
                                <span className="flex items-center">
                                  <FaMapMarkerAlt className="mr-2 h-3 w-3" />
                                  {city.name}
                                </span>
                                <CityStatusIndicator status={city.status} />
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <DropdownMenuItem
                        key={dropdownItem.name}
                        asChild={!dropdownItem.disabled}
                        disabled={dropdownItem.disabled}
                      >
                        {dropdownItem.disabled ? (
                          <span className="flex cursor-not-allowed items-center text-gray-400">
                            {dropdownItem.name}
                            <span className="ml-2 text-xs">
                              {t('navigation.dropdown.coming_soon')}
                            </span>
                          </span>
                        ) : dropdownItem.external ? (
                          <a
                            href={dropdownItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            {dropdownItem.name}
                            <FaArrowUpRightFromSquare className="ml-2 h-3 w-3" />
                          </a>
                        ) : (
                          <Link
                            href={dropdownItem.href as Route}
                            className="flex items-center"
                          >
                            {dropdownItem.name}
                          </Link>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.external ? (
              <NavigationLink
                href={item.href}
                current={item.current}
                external={true}
                name={item.name}
              />
            ) : (
              <NavigationLink
                href={item.href as Route}
                current={item.current}
                name={item.name}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
