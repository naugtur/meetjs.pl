<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { ChevronDown, Info, MapPin } from 'lucide-vue-next';
import { CITIES, UNMAPPED_CITY_PAGES } from '~~/src/content/cities';

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

const IN_CITY_THRESHOLD_KM = 20;

const { t } = useTranslate();
const geoRef = ref<HTMLGeolocationElement | null>(null);
const state = ref<LocateState>('idle');
const nearest = ref<{ city: GeoCity; km: number } | null>(null);

const handleCoords = (lat: number, lng: number) => {
  const city = findNearest(lat, lng);
  nearest.value = { city, km: distanceKm(lat, lng, city.lat, city.lng) };
  state.value = 'done';
};

const onLocation = () => {
  const element = geoRef.value;
  if (!element) return;
  const { position } = element;
  if (position) {
    handleCoords(position.coords.latitude, position.coords.longitude);
  } else {
    state.value = 'error';
  }
};

onMounted(() => {
  const element = geoRef.value;
  if (!element) return;
  element.addEventListener('location', onLocation);
  if (element.position || element.error) onLocation();
});

onBeforeUnmount(() => {
  geoRef.value?.removeEventListener('location', onLocation);
});

const handleFallbackClick = () => {
  if ('HTMLGeolocationElement' in window) return;
  state.value = 'locating';
  navigator.geolocation.getCurrentPosition(
    (position) =>
      handleCoords(position.coords.latitude, position.coords.longitude),
    () => {
      state.value = 'error';
    },
  );
};
</script>

<template>
  <div class="flex flex-col items-center gap-2 pt-4" aria-live="polite">
    <geolocation ref="geoRef" autolocate="">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-md bg-purple px-4 py-2 font-medium text-white transition-colors hover:bg-green hover:text-purple"
        @click="handleFallbackClick"
      >
        <MapPin class="h-4 w-4" aria-hidden="true" />
        {{
          state === 'locating'
            ? t('join_us.locating')
            : t('join_us.find_nearest')
        }}
      </button>
    </geolocation>
    <p v-if="state === 'done' && nearest" class="text-sm">
      {{
        nearest.km <= IN_CITY_THRESHOLD_KM
          ? t('join_us.you_are_in')
          : t('join_us.nearest_result')
      }}
      <NuxtLink
        :to="nearest.city.href"
        class="font-semibold text-purple hover:underline"
        >{{ nearest.city.name }}</NuxtLink
      >{{
        nearest.km > IN_CITY_THRESHOLD_KM
          ? ` (~${Math.round(nearest.km)} km)`
          : ''
      }}
    </p>
    <p v-if="state === 'error'" class="text-sm text-muted-foreground">
      {{ t('join_us.locate_error') }}
    </p>
    <details class="group max-w-sm text-center text-sm text-muted-foreground">
      <summary
        class="flex cursor-pointer list-none items-center gap-1 transition-all hover:underline [&::-webkit-details-marker]:hidden"
      >
        <Info class="h-3.5 w-3.5" aria-hidden="true" />
        {{ t('join_us.how_it_works') }}
        <ChevronDown
          class="h-3 w-3 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p class="pt-2">{{ t('join_us.how_it_works_body') }}</p>
    </details>
  </div>
</template>
