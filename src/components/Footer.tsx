import { For, Show } from 'solid-js';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import { instagramLinksData } from '@/content/socialLinks';
import { CITIES } from '@/content/cities';
import {
  FaRegularEnvelope,
  FaSolidArrowUpRightFromSquare,
} from 'solid-icons/fa';
import { useTranslate } from '@/i18n';
import { getTranslatedFooterMenuLinks } from '@/hooks/useTranslatedMenuLinks';
import { CityStatusIndicator } from '@/components/Navigation/CityStatusIndicator';

export const Footer = () => {
  const { t } = useTranslate();
  const footerMenuLinks = getTranslatedFooterMenuLinks();

  return (
    <footer class="border-t border-white/10 bg-purple text-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* First column */}
          <div class="space-y-8">
            <Logo clickable={false} />
            <SocialLinks />
            <ul class="space-y-4">
              <For each={instagramLinksData}>
                {(socialLink) => (
                  <li>
                    <a
                      href={socialLink.url}
                      target="_blank"
                      class="flex items-center gap-2 hover:text-gray-300"
                    >
                      {socialLink.icon}
                      <span>{socialLink.name}</span>
                    </a>
                  </li>
                )}
              </For>
              <li>
                <a
                  href="mailto:contact@meetjs.pl"
                  class="flex items-center gap-2 hover:text-gray-300"
                >
                  <FaRegularEnvelope />
                  contact@meetjs.pl
                </a>
              </li>
            </ul>
          </div>

          {/* Cities column */}
          <div>
            <h3 class="text-xl font-semibold">{t('footer.cities')}</h3>
            <ul class="mt-4 space-y-2">
              <For each={CITIES}>
                {(city) => (
                  <li>
                    <a href={city.href} class="hover:text-gray-300">
                      {city.name}
                      <Show when={city.status}>
                        <CityStatusIndicator status={city.status} />
                      </Show>
                    </a>
                  </li>
                )}
              </For>
            </ul>
            <div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80">
              <span>{t('footer.status_legend_label')}</span>
              <span class="flex items-center gap-2">
                <CityStatusIndicator status="active" />
                {t('footer.status.active')}
              </span>
              <span class="flex items-center gap-2">
                <CityStatusIndicator status="coming-soon" />
                {t('footer.status.coming_soon')}
              </span>
              <span class="flex items-center gap-2">
                <CityStatusIndicator status="paused" />
                {t('footer.status.paused')}
              </span>
              <span class="flex items-center gap-2">
                <CityStatusIndicator status="new" />
                {t('footer.status.new')}
              </span>
            </div>
          </div>

          {/* Menu column */}
          <nav aria-label="Footer">
            <h3 class="text-xl font-semibold">{t('footer.menu')}</h3>
            <ul class="mt-4 space-y-2">
              <For each={footerMenuLinks}>
                {(link) => (
                  <li>
                    <Show
                      when={link.external}
                      fallback={
                        <a href={link.href} class="hover:text-gray-300">
                          {link.name}
                        </a>
                      }
                    >
                      <a
                        href={link.href}
                        class="hover:text-gray-300"
                        target="_blank"
                        rel="noopener"
                      >
                        {link.name}
                        <FaSolidArrowUpRightFromSquare
                          class="mb-1 ml-2 inline-block h-3 w-3"
                          aria-hidden="true"
                        />
                      </a>
                    </Show>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div class="mt-12 border-t border-white/10 pt-8">
          <p class="text-center">
            © {new Date().getFullYear()} meet.js. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
