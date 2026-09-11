'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { MapPin } from 'lucide-react';
import { useTranslate } from '@tolgee/react';
import { CITIES, UNMAPPED_CITY_PAGES } from '@/content/cities';

interface GeoCity {
  name: string;
  href: string;
  lat: number;
  lng: number;
}

const GEO_CITIES: GeoCity[] = [
  ...CITIES.flatMap((city) =>
    city.geo
      ? [
          {
            name: city.name,
            href: city.href,
            lat: city.geo.lat,
            lng: city.geo.lng,
          },
        ]
      : [],
  ),
  ...UNMAPPED_CITY_PAGES,
];

const toRadians = (deg: number) => (deg * Math.PI) / 180;

const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
};

const findNearest = (lat: number, lng: number) =>
  GEO_CITIES.reduce((best, candidate) =>
    distanceKm(lat, lng, candidate.lat, candidate.lng) <
    distanceKm(lat, lng, best.lat, best.lng)
      ? candidate
      : best,
  );

type LocateState = 'idle' | 'locating' | 'done' | 'error';

export const NearestCity = () => {
  const { t } = useTranslate();
  const geoRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<LocateState>('idle');
  const [nearest, setNearest] = useState<{ city: GeoCity; km: number } | null>(
    null,
  );

  const handleCoords = useCallback((lat: number, lng: number) => {
    const city = findNearest(lat, lng);
    setNearest({ city, km: distanceKm(lat, lng, city.lat, city.lng) });
    setState('done');
  }, []);

  useEffect(() => {
    const element = geoRef.current;
    if (!element) return;

    const onLocation = (event: Event) => {
      const { latitude, longitude } = (
        event as Event & {
          coords: { latitude: number; longitude: number };
        }
      ).coords;
      handleCoords(latitude, longitude);
    };

    element.addEventListener('location', onLocation);
    return () => element.removeEventListener('location', onLocation);
  }, [handleCoords]);

  const handleFallbackClick = () => {
    if ('HTMLGeolocationElement' in window) return;
    setState('locating');
    navigator.geolocation.getCurrentPosition(
      (position) =>
        handleCoords(position.coords.latitude, position.coords.longitude),
      () => setState('error'),
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 pt-4" aria-live="polite">
      <geolocation ref={geoRef}>
        <button
          type="button"
          autolocate=""
          onClick={handleFallbackClick}
          className="inline-flex items-center gap-2 rounded-md bg-purple px-4 py-2 font-medium text-white transition-colors hover:bg-green hover:text-purple"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {state === 'locating'
            ? t('join_us.locating')
            : t('join_us.find_nearest')}
        </button>
      </geolocation>
      {state === 'done' && nearest && (
        <p className="text-sm">
          {t('join_us.nearest_result')}{' '}
          <Link
            href={nearest.city.href as Route}
            className="font-semibold text-purple hover:underline"
          >
            {nearest.city.name}
          </Link>{' '}
          (~{Math.round(nearest.km)} km)
        </p>
      )}
      {state === 'error' && (
        <p className="text-sm text-muted-foreground">
          {t('join_us.locate_error')}
        </p>
      )}
    </div>
  );
};
