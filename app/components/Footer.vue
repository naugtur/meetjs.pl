<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';
import IconRegEnvelope from '~icons/fa6-regular/envelope';
import { CITIES } from '~~/src/content/cities';
import { instagramLinksData } from '~~/src/content/socialLinks';

const { t } = useTranslate();
const footerMenuLinks = useFooterMenuLinks();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-white/10 bg-purple text-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- First column -->
        <div class="space-y-8">
          <Logo :clickable="false" />
          <SocialLinks />
          <ul class="space-y-4">
            <li v-for="socialLink in instagramLinksData" :key="socialLink.name">
              <a
                :href="socialLink.url"
                target="_blank"
                class="flex items-center gap-2 hover:text-gray-300"
              >
                <SocialIcon :name="socialLink.icon" />
                <span>{{ socialLink.name }}</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@meetjs.pl"
                class="flex items-center gap-2 hover:text-gray-300"
              >
                <IconRegEnvelope />
                contact@meetjs.pl
              </a>
            </li>
          </ul>
        </div>

        <!-- Cities column -->
        <div>
          <h3 class="text-xl font-semibold">{{ t('footer.cities') }}</h3>
          <ul class="mt-4 space-y-2">
            <li v-for="city in CITIES" :key="city.name">
              <NuxtLink :to="city.href" class="hover:text-gray-300"
                >{{ city.name
                }}<CityStatusIndicator v-if="city.status" :status="city.status"
              /></NuxtLink>
            </li>
          </ul>
          <div
            class="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80"
          >
            <span>{{ t('footer.status_legend_label') }}</span>
            <span class="flex items-center gap-2">
              <CityStatusIndicator status="active" />
              {{ t('footer.status.active') }}
            </span>
            <span class="flex items-center gap-2">
              <CityStatusIndicator status="coming-soon" />
              {{ t('footer.status.coming_soon') }}
            </span>
            <span class="flex items-center gap-2">
              <CityStatusIndicator status="paused" />
              {{ t('footer.status.paused') }}
            </span>
            <span class="flex items-center gap-2">
              <CityStatusIndicator status="new" />
              {{ t('footer.status.new') }}
            </span>
          </div>
        </div>

        <!-- Menu column -->
        <nav aria-label="Footer">
          <h3 class="text-xl font-semibold">{{ t('footer.menu') }}</h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in footerMenuLinks" :key="link.name">
              <a
                v-if="link.external"
                :href="link.href"
                class="hover:text-gray-300"
                target="_blank"
                rel="noopener"
              >
                {{ link.name
                }}<IconArrowUpRightFromSquare
                  class="mb-1 ml-2 inline-block h-3 w-3"
                  aria-hidden="true"
                />
              </a>
              <a
                v-else-if="link.href.startsWith('#')"
                :href="link.href"
                class="hover:text-gray-300"
              >
                {{ link.name }}
              </a>
              <NuxtLink v-else :to="link.href" class="hover:text-gray-300">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="mt-12 border-t border-white/10 pt-8">
        <p class="text-center">
          © {{ year }} meet.js. {{ t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>
