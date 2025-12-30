import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2025 Year in Review | meet.js',
  description:
    "Frontend, JavaScript, and TypeScript Year in Review 2025. The year we survived another framework explosion, embraced AI, and still couldn't center a div without Googling it.",
  openGraph: {
    title: '2025 Year in Review | meet.js',
    description:
      'Frontend, JavaScript, and TypeScript Year in Review 2025. Stats, highlights, and predictions for 2026!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 Year in Review | meet.js',
    description:
      'Frontend, JavaScript, and TypeScript Year in Review 2025. Stats, highlights, and predictions for 2026!',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
