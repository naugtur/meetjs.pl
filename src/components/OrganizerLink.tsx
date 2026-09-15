'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { trackClientEvent } from '@/lib/analytics';

type OrganizerLinkProps = {
  children: ReactNode;
  className?: string;
  source:
    | 'hero'
    | 'map'
    | 'empty-events'
    | 'organizer-hero'
    | 'organizer-path'
    | 'organizer-footer';
} & (
  | { kind?: 'navigation' }
  | {
      kind: 'contact';
      intent: 'general' | 'one-event' | 'local-team' | 'new-city';
      subject: string;
      body: string;
    }
);

export const OrganizerLink = (props: OrganizerLinkProps) => {
  if (props.kind === 'contact') {
    return (
      <a
        href={`mailto:contact@meetjs.pl?subject=${encodeURIComponent(props.subject)}&body=${encodeURIComponent(props.body)}`}
        className={props.className}
        onClick={() =>
          trackClientEvent('click_organizer_contact', {
            source: props.source,
            intent: props.intent,
          })
        }
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link
      href="/how-to-become-an-organizer"
      className={props.className}
      onClick={() =>
        trackClientEvent('click_organizer_entry', { source: props.source })
      }
    >
      {props.children}
    </Link>
  );
};
