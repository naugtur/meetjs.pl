import { For, Show } from 'solid-js';
import {
  FaSolidArrowUpRightFromSquare,
  FaSolidChevronDown,
  FaSolidMapMarkerAlt,
} from 'solid-icons/fa';

import { CITIES } from '@/content/cities';
import { classNames } from '@/utils/classNames';
import { SocialLinks } from '@/components/SocialLinks';
import { CityStatusIndicator } from './CityStatusIndicator';
import { useTranslate } from '@/i18n';
import { useTranslatedMenuLinks } from '@/hooks/useTranslatedMenuLinks';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  useDisclosure,
} from '@/components/ui/disclosure';

const MobileDropdownSection = (props: {
  item: ReturnType<typeof useTranslatedMenuLinks>[number];
}) => {
  const { t } = useTranslate();
  const disclosure = useDisclosure();
  const item = props.item;

  return (
    <div>
      <DisclosureButton class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-white hover:bg-green/80 hover:text-purple">
        <span>{item.name}</span>
        <FaSolidChevronDown
          class={classNames(
            disclosure?.open() ? 'rotate-180' : '',
            'h-4 w-4 transform transition-transform duration-200',
          )}
          aria-hidden="true"
        />
      </DisclosureButton>
      <DisclosurePanel class="space-y-1">
        <For each={item.dropdown}>
          {(dropdownItem) => (
            <Show
              when={dropdownItem.type !== 'separator'}
              fallback={<div class="my-2 border-t border-gray-200" />}
            >
              <Show
                when={dropdownItem.type === 'cities'}
                fallback={
                  <Show
                    when={!dropdownItem.disabled}
                    fallback={
                      <div
                        class="block cursor-not-allowed rounded-md px-3 py-2 text-base font-medium text-gray-400"
                        aria-disabled="true"
                      >
                        <span class="flex items-center justify-between">
                          {dropdownItem.name}
                          <span class="text-xs">
                            {t('navigation.dropdown.coming_soon')}
                          </span>
                        </span>
                      </div>
                    }
                  >
                    <a
                      href={dropdownItem.href}
                      class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                      target={dropdownItem.external ? '_blank' : undefined}
                      rel={dropdownItem.external ? 'noopener' : undefined}
                    >
                      <span class="flex items-center">
                        {dropdownItem.name}
                        <Show when={dropdownItem.external}>
                          <FaSolidArrowUpRightFromSquare class="ml-2 h-4 w-4" />
                        </Show>
                      </span>
                    </a>
                  </Show>
                }
              >
                <div>
                  <div class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {t('navigation.dropdown.cities_label')}
                  </div>
                  <For
                    each={CITIES.slice().sort((a, b) =>
                      a.name.localeCompare(b.name),
                    )}
                  >
                    {(city) => (
                      <a
                        href={city.href}
                        class="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                      >
                        <span class="flex items-center">
                          <FaSolidMapMarkerAlt class="mr-2 h-4 w-4" />
                          {city.name}
                        </span>
                        <CityStatusIndicator status={city.status} />
                      </a>
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          )}
        </For>
      </DisclosurePanel>
    </div>
  );
};

export const MobileNavigation = () => {
  const menuLinks = useTranslatedMenuLinks();

  return (
    <DisclosurePanel class="sm:hidden">
      <nav
        aria-label="Mobile navigation menu"
        itemscope
        itemtype="https://schema.org/SiteNavigationElement"
        class="max-h-[70vh] overflow-y-auto"
        role="navigation"
      >
        <ul class="space-y-1 px-2 pb-3 pt-2" role="menu">
          <For each={menuLinks}>
            {(item) => (
              <li class="first:pt-0">
                <Show
                  when={item.dropdown}
                  fallback={
                    <DisclosureButton
                      as="a"
                      href={item.href}
                      class={classNames(
                        item.highlight
                          ? 'animate-pulse-scale bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg'
                          : item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener' : undefined}
                      {...(item.external
                        ? {
                            'aria-label': `${item.name} (opens in a new tab)`,
                          }
                        : {})}
                    >
                      {item.name}
                      <Show when={item.external}>
                        <FaSolidArrowUpRightFromSquare
                          class="mb-1 ml-2 inline-block"
                          aria-hidden="true"
                        />
                      </Show>
                    </DisclosureButton>
                  }
                >
                  <Disclosure>
                    <MobileDropdownSection item={item} />
                  </Disclosure>
                </Show>
              </li>
            )}
          </For>
        </ul>
        <div class="border-t border-gray-600 px-2 pt-4">
          <LanguageSwitcher variant="mobile" class="mb-4" />
        </div>
        <div class="flex justify-center px-2">
          <SocialLinks />
        </div>
      </nav>
    </DisclosurePanel>
  );
};
