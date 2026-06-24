import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media o nas | meet.js',
  description:
    'Materiały medialne i publikacje o meet.js - największej społeczności JavaScript w Polsce',
  openGraph: {
    title: 'Media o nas | meet.js',
    description:
      'Materiały medialne i publikacje o meet.js - największej społeczności JavaScript w Polsce',
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
