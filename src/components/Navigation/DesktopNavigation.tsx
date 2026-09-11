import { For, Show } from 'solid-js';
import {
  FaSolidArrowUpRightFromSquare,
  FaSolidChevronDown,
  FaSolidMapMarkerAlt,
} from 'solid-icons/fa';

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
import { useTranslate } from '@/i18n';
import { useTranslatedMenuLinks } from '@/hooks/useTranslatedMenuLinks';

export const DesktopNavigation = () => {
  const { t } = useTranslate();
  const menuLinks = useTranslatedMenuLinks();

  return (
    <nav
      aria-label="Primary navigation"
      class="hidden sm:flex"
      itemscope
      itemtype="https://schema.org/SiteNavigationElement"
      role="navigation"
    >
      <ul class="flex items-center justify-center gap-4" role="menubar">
        <For each={menuLinks}>
          {(item) => (
            <li role="none">
              <Show
                when={item.dropdown}
                fallback={
                  <NavigationLink
                    href={item.href}
                    current={item.current}
                    external={item.external ? true : undefined}
                    name={item.name}
                    highlight={item.highlight}
                  />
                }
              >
                {(dropdown) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      class="flex items-center whitespace-nowrap rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple"
                      aria-haspopup="true"
                    >
                      {item.name}
                      <FaSolidChevronDown
                        class="ml-1 h-4 w-4"
                        aria-hidden="true"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      class={
                        item.name === 'events'
                          ? 'max-h-[60vh] w-56 overflow-y-auto'
                          : 'w-56'
                      }
                    >
                      <For each={dropdown()}>
                        {(dropdownItem) => (
                          <Show
                            when={dropdownItem.type !== 'separator'}
                            fallback={<DropdownMenuSeparator />}
                          >
                            <Show
                              when={dropdownItem.type === 'cities'}
                              fallback={
                                <DropdownMenuItem
                                  disabled={dropdownItem.disabled}
                                >
                                  <Show
                                    when={!dropdownItem.disabled}
                                    fallback={
                                      <span class="flex cursor-not-allowed items-center text-gray-400">
                                        {dropdownItem.name}
                                        <span class="ml-2 text-xs">
                                          {t('navigation.dropdown.coming_soon')}
                                        </span>
                                      </span>
                                    }
                                  >
                                    <Show
                                      when={dropdownItem.external}
                                      fallback={
                                        <a
                                          href={dropdownItem.href}
                                          class="flex items-center"
                                        >
                                          {dropdownItem.name}
                                        </a>
                                      }
                                    >
                                      <a
                                        href={dropdownItem.href}
                                        target="_blank"
                                        rel="noopener"
                                        class="flex items-center"
                                      >
                                        {dropdownItem.name}
                                        <FaSolidArrowUpRightFromSquare class="ml-2 h-3 w-3" />
                                      </a>
                                    </Show>
                                  </Show>
                                </DropdownMenuItem>
                              }
                            >
                              <div>
                                <DropdownMenuLabel class="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                  {t('navigation.dropdown.cities_label')}
                                </DropdownMenuLabel>
                                <For
                                  each={CITIES.slice().sort((a, b) =>
                                    a.name.localeCompare(b.name),
                                  )}
                                >
                                  {(city) => (
                                    <DropdownMenuItem>
                                      <a
                                        href={city.href}
                                        class="flex items-center justify-between"
                                      >
                                        <span class="flex items-center">
                                          <FaSolidMapMarkerAlt class="mr-2 h-3 w-3" />
                                          {city.name}
                                        </span>
                                        <CityStatusIndicator
                                          status={city.status}
                                        />
                                      </a>
                                    </DropdownMenuItem>
                                  )}
                                </For>
                              </div>
                            </Show>
                          </Show>
                        )}
                      </For>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </Show>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
