'use client';

import { Disclosure } from '@headlessui/react';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import { MobileMenuButton } from './MobileMenuButton';
import type { NavigationMode } from './DesktopNavigation';
import { useState, useEffect } from 'react';

export const AdminNavigation = () => {
  const mode: NavigationMode = 'admin';
  const [userName, setUserName] = useState<string>('Admin');

  useEffect(() => {
    // Get user info for display
    const storedUserName = localStorage.getItem('meetjs-admin-user-name');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <header role="banner" className="sticky top-0 z-40">
        <Disclosure as="nav" className="bg-purple" aria-label="Admin navigation">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex flex-1 items-center justify-between sm:items-stretch">
                    <div className="flex-shrink-0">
                      <a href="/" className="flex items-center">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                        </svg>
                        <span className="ml-2 text-xl font-bold text-white">meet.js</span>
                        <span className="ml-2 text-sm text-white/80 bg-white/20 px-2 py-1 rounded">ADMIN</span>
                      </a>
                    </div>
                    <DesktopNavigation mode={mode} />
                    <div className="flex items-center">
                      <span className="text-sm text-white/80 hidden sm:block">
                        Welcome, <span className="font-medium text-white">{userName}</span>
                      </span>
                    </div>
                  </div>
                  <MobileMenuButton open={open} />
                </div>
              </div>
              <MobileNavigation mode={mode} />
            </>
          )}
        </Disclosure>
      </header>
    </>
  );
};