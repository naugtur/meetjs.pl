// src/app/team/layout.tsx
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'meet.js Team | All Organizers',
  description: 'Meet the people who organize meet.js events across Poland. Filter by role and discover our city chapters.',
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
