import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaArrowUpRightFromSquare, FaChevronDown } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { menuLinks } from '@/content/menuLinks';
import { CITIES } from '@/content/cities';
import { classNames } from '@/utils/classNames';
import { SocialLinks } from '@/components/SocialLinks';
import { CityStatusIndicator } from './CityStatusIndicator';

export const MobileNavigation = () => {
  return (
    <DisclosurePanel className="sm:hidden">
      <nav
        aria-label="Mobile navigation menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        className="max-h-[70vh] overflow-y-auto"
        role="navigation"
      >
        <ul className="space-y-1 px-2 pb-3 pt-2" role="menu">
          {menuLinks.map((item) => {
            if (item.dropdown) {
              return (
                <li key={item.name} className="first:pt-0">
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <DisclosureButton className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-white hover:bg-green/80 hover:text-purple">
                          <span>{item.name}</span>
                          <FaChevronDown
                            className={classNames(
                              open ? 'rotate-180' : '',
                              'h-4 w-4 transform transition-transform duration-200',
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="space-y-1">
                          {item.dropdown?.map((dropdownItem, index) => {
                            if (dropdownItem.type === 'separator') {
                              return (
                                <div
                                  key={index}
                                  className="my-2 border-t border-gray-200"
                                />
                              );
                            }

                            if (dropdownItem.type === 'cities') {
                              return (
                                <div key={index}>
                                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Cities
                                  </div>
                                  {CITIES.sort((a, b) =>
                                    a.name.localeCompare(b.name),
                                  ).map((city) => (
                                    <DisclosureButton
                                      key={city.name}
                                      as="a"
                                      href={city.href}
                                      className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                                    >
                                      <span className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                                        {city.name}
                                      </span>
                                      <CityStatusIndicator
                                        status={city.status}
                                      />
                                    </DisclosureButton>
                                  ))}
                                </div>
                              );
                            }

                            if (dropdownItem.disabled) {
                              return (
                                <div
                                  key={dropdownItem.name}
                                  className="block cursor-not-allowed rounded-md px-3 py-2 text-base font-medium text-gray-400"
                                  aria-disabled="true"
                                >
                                  <span className="flex items-center justify-between">
                                    {dropdownItem.name}
                                    <span className="text-xs">
                                      (Coming Soon)
                                    </span>
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <DisclosureButton
                                key={dropdownItem.name}
                                as="a"
                                href={dropdownItem.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                                target={
                                  dropdownItem.external ? '_blank' : undefined
                                }
                                rel={
                                  dropdownItem.external
                                    ? 'noopener noreferrer'
                                    : undefined
                                }
                              >
                                <span className="flex items-center">
                                  {dropdownItem.name}
                                  {dropdownItem.external && (
                                    <FaArrowUpRightFromSquare className="ml-2 h-4 w-4" />
                                  )}
                                </span>
                              </DisclosureButton>
                            );
                          })}
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                </li>
              );
            } else {
              return (
                <li key={item.name}>
                  <DisclosureButton
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    {...(item.external && {
                      'aria-label': `${item.name} (opens in a new tab)`,
                    })}
                  >
                    {item.name}
                    {item.external && (
                      <FaArrowUpRightFromSquare
                        className="mb-1 ml-2 inline-block"
                        aria-hidden="true"
                      />
                    )}
                  </DisclosureButton>
                </li>
              );
            }
          })}
        </ul>
        <div className="flex justify-center px-2 pt-4">
          <SocialLinks />
        </div>
      </nav>
    </DisclosurePanel>
  );
};
