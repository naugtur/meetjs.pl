import { Disclosure } from '@/components/ui/disclosure';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';

import { DesktopNavigation } from './Navigation/DesktopNavigation';
import { MobileNavigation } from './Navigation/MobileNavigation';
import { MobileMenuButton } from './Navigation/MobileMenuButton';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = () => {
  return (
    <header role="banner" class="sticky top-0 z-40">
      <Disclosure as="nav" class="bg-purple" aria-label="Main navigation">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-between sm:items-stretch">
              <Logo />
              <DesktopNavigation />
              <aside
                class="hidden items-center justify-center md:flex"
                aria-label="Social media links"
              >
                <SocialLinks />
                <LanguageSwitcher variant="desktop" />
              </aside>
            </div>
            <MobileMenuButton />
          </div>
        </div>
        <MobileNavigation />
      </Disclosure>
    </header>
  );
};
