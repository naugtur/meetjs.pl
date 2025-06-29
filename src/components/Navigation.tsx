'use client';

import { Disclosure } from '@headlessui/react';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import { PromoBanners } from '@/components/PromoBanners';
import { softwareDiscounts } from '@/content/software-discounts';
import { discounts } from '@/content/discounts';
import { DesktopNavigation } from './Navigation/DesktopNavigation';
import { MobileNavigation } from './Navigation/MobileNavigation';
import { MobileMenuButton } from './Navigation/MobileMenuButton';

export const Navigation = () => {
  return (
    <>
      <PromoBanners promos={[...discounts, ...softwareDiscounts]} />
      <header role="banner">
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
                    <aside className="hidden items-center justify-center md:flex" aria-label="Social media links">
                      <SocialLinks />
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
