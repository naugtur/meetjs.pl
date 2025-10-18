import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos | meet.js',
  description:
    'Watch talks, workshops, and community highlights from meet.js events across Poland. Learn from expert speakers on JavaScript, web development, and modern technologies.',
  openGraph: {
    title: 'Videos | meet.js',
    description:
      'Watch talks, workshops, and community highlights from meet.js events across Poland.',
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
