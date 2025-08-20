import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';
import { instagramLinksData } from '@/content/socialLinks';
import { CITIES } from '@/content/cities';
import { footerMenuLinks } from '@/content/menuLinks';
import { FaRegEnvelope, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import type { Route } from 'next';

export const Footer = () => {
  return (
    <footer className="bg-purple text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* First column */}
          <div className="space-y-8">
            <Logo clickable={false} />
            <SocialLinks />
            <ul className="space-y-4">
              {instagramLinksData.map((socialLink) => (
                <li key={socialLink.name}>
                  <a
                    href={socialLink.url}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    {socialLink.icon}
                    <span>{socialLink.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contact@meetjs.pl"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <FaRegEnvelope />
                  contact@meetjs.pl
                </a>
              </li>
            </ul>
          </div>

          {/* Cities column */}
          <div>
            <h3 className="text-xl font-semibold">Cities</h3>
            <ul className="mt-4 space-y-2">
              {CITIES.map((city) => (
                <li key={city.name}>
                  <Link href={city.href as Route} className="hover:text-gray-300">
                    {city.name}
                    {city.status && (
                      <span
                        className={`ml-2 inline-block h-2 w-2 rounded-full ${
                          city.status === 'active'
                            ? 'bg-green'
                            : city.status === 'coming-soon'
                              ? 'bg-yellow-400'
                              : 'bg-gray-400'
                        }`}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu column */}
          <nav aria-label="Footer">
            <h3 className="text-xl font-semibold">Menu</h3>
            <ul className="mt-4 space-y-2">
              {footerMenuLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="hover:text-gray-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                      <FaArrowUpRightFromSquare
                        className="mb-1 ml-2 inline-block h-3 w-3"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <Link href={link.href as Route} className="hover:text-gray-300">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center">
            {' '}
            {new Date().getFullYear()} meet.js. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
