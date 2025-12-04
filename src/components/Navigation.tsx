'use client';

import { Disclosure } from '@headlessui/react';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import { PromoBanners } from '@/components/PromoBanners';
import { softwareDiscounts } from '@/content/software-discounts';
import { eventsDiscounts } from '@/content/events-discounts';
import { DesktopNavigation } from './Navigation/DesktopNavigation';
import { MobileNavigation } from './Navigation/MobileNavigation';
import { MobileMenuButton } from './Navigation/MobileMenuButton';
import { learningDiscounts } from '@/content/learning-discounts';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = () => {
  return (
    <>
      <PromoBanners
        promos={[
          ...eventsDiscounts,
          ...softwareDiscounts,
          ...learningDiscounts,
        ]}
      />
      <header role="banner" suppressHydrationWarning>
        <Disclosure
          as="nav"
          className="sticky top-0 z-20 bg-purple"
          aria-label="Main navigation"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex flex-1 items-center justify-between sm:items-stretch">
                    <Logo />
                    <DesktopNavigation />
                    <aside
                      className="hidden items-center justify-center md:flex"
                      aria-label="Social media links"
                    >
                      <SocialLinks />
                      <LanguageSwitcher variant="desktop" />
                    </aside>
                  </div>
                  <MobileMenuButton open={open} />
                </div>
              </div>
              <MobileNavigation />
            </>
          )}
        </Disclosure>
      </header>
    </>
  );
};
