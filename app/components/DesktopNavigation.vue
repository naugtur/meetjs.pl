<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui';
import IconMapMarkerAlt from '~icons/fa-solid/map-marker-alt';
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';
import IconChevronDown from '~icons/fa6-solid/chevron-down';
import { CITIES } from '~~/src/content/cities';

const { t } = useTranslate();
const menuLinks = useMenuLinks();
const sortedCities = computed(() =>
  [...CITIES].sort((a, b) => a.name.localeCompare(b.name)),
);
</script>

<template>
  <nav
    aria-label="Primary navigation"
    class="hidden sm:flex"
    itemscope
    itemtype="https://schema.org/SiteNavigationElement"
    role="navigation"
  >
    <ul class="flex items-center justify-center gap-4" role="menubar">
      <li v-for="item in menuLinks" :key="item.name" role="none">
        <DropdownMenuRoot v-if="item.dropdown">
          <DropdownMenuTrigger
            class="flex items-center whitespace-nowrap rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ item.name }}
            <IconChevronDown class="ml-1 h-4 w-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <UiDropdownMenuContent
            align="start"
            :class="
              item.name === 'events'
                ? 'max-h-[60vh] w-56 overflow-y-auto'
                : 'w-56'
            "
          >
            <template
              v-for="(dropdownItem, index) in item.dropdown"
              :key="index"
            >
              <UiDropdownMenuSeparator
                v-if="dropdownItem.type === 'separator'"
              />
              <div v-else-if="dropdownItem.type === 'cities'">
                <UiDropdownMenuLabel
                  class="text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {{ t('navigation.dropdown.cities_label') }}
                </UiDropdownMenuLabel>
                <UiDropdownMenuItem
                  v-for="city in sortedCities"
                  :key="city.name"
                  as-child
                >
                  <NuxtLink
                    :to="city.href"
                    class="flex items-center justify-between"
                  >
                    <span class="flex items-center">
                      <IconMapMarkerAlt class="mr-2 h-3 w-3" />
                      {{ city.name }}
                    </span>
                    <CityStatusIndicator :status="city.status" />
                  </NuxtLink>
                </UiDropdownMenuItem>
              </div>
              <UiDropdownMenuItem
                v-else
                :as-child="!dropdownItem.disabled"
                :disabled="dropdownItem.disabled"
              >
                <span
                  v-if="dropdownItem.disabled"
                  class="flex cursor-not-allowed items-center text-gray-400"
                >
                  {{ dropdownItem.name }}
                  <span class="ml-2 text-xs">
                    {{ t('navigation.dropdown.coming_soon') }}
                  </span>
                </span>
                <a
                  v-else-if="dropdownItem.external"
                  :href="dropdownItem.href"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center"
                >
                  {{ dropdownItem.name }}
                  <IconArrowUpRightFromSquare class="ml-2 h-3 w-3" />
                </a>
                <NuxtLink
                  v-else
                  :to="dropdownItem.href"
                  class="flex items-center"
                >
                  {{ dropdownItem.name }}
                </NuxtLink>
              </UiDropdownMenuItem>
            </template>
          </UiDropdownMenuContent>
        </DropdownMenuRoot>
        <NavigationLink
          v-else
          :href="item.href"
          :current="item.current"
          :external="item.external"
          :name="item.name"
          :highlight="item.highlight"
        />
      </li>
    </ul>
  </nav>
</template>
