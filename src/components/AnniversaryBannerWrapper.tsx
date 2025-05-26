'use client';

import dynamic from 'next/dynamic';

const AnniversaryBanner = dynamic(
  () => import('@/components/AnniversaryBanner'),
  { ssr: false }
);

export default function AnniversaryBannerWrapper() {
  return <AnniversaryBanner />;
}
