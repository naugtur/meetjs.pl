import { FaChevronDown, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { menuLinks } from '@/content/menuLinks';
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

export const DesktopNavigation = () => {
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
                            Cities
                          </DropdownMenuLabel>
                          {CITIES.sort((a, b) =>
                            a.name.localeCompare(b.name),
                          ).map((city) => (
                            <DropdownMenuItem key={city.name} asChild>
                              <Link
                                href={city.href}
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
                            <span className="ml-2 text-xs">(Coming Soon)</span>
                          </span>
                        ) : (
                          <Link
                            href={dropdownItem.href}
                            target={
                              dropdownItem.external ? '_blank' : undefined
                            }
                            rel={
                              dropdownItem.external
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className="flex items-center"
                          >
                            {dropdownItem.name}
                            {dropdownItem.external && (
                              <FaArrowUpRightFromSquare className="ml-2 h-3 w-3" />
                            )}
                          </Link>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavigationLink
                href={item.href}
                current={item.current}
                external={item.external}
                name={item.name}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
