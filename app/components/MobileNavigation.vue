<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import IconMapMarkerAlt from '~icons/fa-solid/map-marker-alt';
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';
import IconChevronDown from '~icons/fa6-solid/chevron-down';
import { CITIES } from '~~/src/content/cities';

const { t } = useTranslate();
const menuLinks = useMenuLinks();
const sortedCities = computed(() =>
  [...CITIES].sort((a, b) => a.name.localeCompare(b.name)),
);

// Nested disclosures (cities, discounts, about), closed by default.
const openItems = ref(new Set<string>());
const toggle = (name: string) => {
  const next = new Set(openItems.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  openItems.value = next;
};
</script>

<template>
  <nav
    aria-label="Mobile navigation menu"
    itemscope
    itemtype="https://schema.org/SiteNavigationElement"
    class="max-h-[70vh] overflow-y-auto"
    role="navigation"
  >
    <ul class="space-y-1 px-2 pb-3 pt-2" role="menu">
      <template v-for="item in menuLinks" :key="item.name">
        <li v-if="item.dropdown" class="first:pt-0">
          <div>
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-white hover:bg-green/80 hover:text-purple"
              :aria-expanded="openItems.has(item.name)"
              @click="toggle(item.name)"
            >
              <span>{{ item.name }}</span>
              <IconChevronDown
                :class="
                  classNames(
                    openItems.has(item.name) ? 'rotate-180' : '',
                    'h-4 w-4 transform transition-transform duration-200',
                  )
                "
                aria-hidden="true"
              />
            </button>
            <div v-if="openItems.has(item.name)" class="space-y-1">
              <template
                v-for="(dropdownItem, index) in item.dropdown"
                :key="index"
              >
                <div
                  v-if="dropdownItem.type === 'separator'"
                  class="my-2 border-t border-gray-200"
                />
                <div v-else-if="dropdownItem.type === 'cities'">
                  <div
                    class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {{ t('navigation.dropdown.cities_label') }}
                  </div>
                  <a
                    v-for="city in sortedCities"
                    :key="city.name"
                    :href="city.href"
                    class="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                  >
                    <span class="flex items-center">
                      <IconMapMarkerAlt class="mr-2 h-4 w-4" />
                      {{ city.name }}
                    </span>
                    <CityStatusIndicator :status="city.status" />
                  </a>
                </div>
                <div
                  v-else-if="dropdownItem.disabled"
                  class="block cursor-not-allowed rounded-md px-3 py-2 text-base font-medium text-gray-400"
                  aria-disabled="true"
                >
                  <span class="flex items-center justify-between">
                    {{ dropdownItem.name }}
                    <span class="text-xs">
                      {{ t('navigation.dropdown.coming_soon') }}
                    </span>
                  </span>
                </div>
                <a
                  v-else
                  :href="dropdownItem.href"
                  class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green/80 hover:text-purple"
                  :target="dropdownItem.external ? '_blank' : undefined"
                  :rel="dropdownItem.external ? 'noopener' : undefined"
                >
                  <span class="flex items-center">
                    {{ dropdownItem.name }}
                    <IconArrowUpRightFromSquare
                      v-if="dropdownItem.external"
                      class="ml-2 h-4 w-4"
                    />
                  </span>
                </a>
              </template>
            </div>
          </div>
        </li>
        <li v-else>
          <a
            :href="item.href"
            :class="
              classNames(
                item.highlight
                  ? 'animate-pulse-scale bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg'
                  : item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )
            "
            :aria-current="item.current ? 'page' : undefined"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener' : undefined"
            :aria-label="
              item.external ? `${item.name} (opens in a new tab)` : undefined
            "
          >
            {{ item.name
            }}<IconArrowUpRightFromSquare
              v-if="item.external"
              class="mb-1 ml-2 inline-block"
              aria-hidden="true"
            />
          </a>
        </li>
      </template>
    </ul>
    <div class="border-t border-gray-600 px-2 pt-4">
      <LanguageSwitcher variant="mobile" class="mb-4" />
    </div>
    <div class="flex justify-center px-2">
      <SocialLinks />
    </div>
  </nav>
</template>
