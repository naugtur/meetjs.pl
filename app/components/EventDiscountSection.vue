<script setup lang="ts">
import type { Promo } from '~~/src/types/promo';

const props = defineProps<{ promos: Promo[] }>();

const selectedCountries = ref<string[]>([]);
const now = useRenderNow();

// Filter out expired promos and sort by expiration date
const visiblePromos = computed(() =>
  props.promos
    .filter((promo) => new Date(promo.expiresAt) >= now)
    .sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
    ),
);

// Get available countries from active promos
const availableCountries = computed(
  () =>
    [
      ...new Set(
        visiblePromos.value.map((promo) => promo.country).filter(Boolean),
      ),
    ] as string[],
);

// Apply country filters to active promos
const filteredPromos = computed(() =>
  selectedCountries.value.length === 0
    ? visiblePromos.value
    : visiblePromos.value.filter(
        (promo) =>
          promo.country && selectedCountries.value.includes(promo.country),
      ),
);

const toggleCountry = (country: string) => {
  selectedCountries.value = selectedCountries.value.includes(country)
    ? selectedCountries.value.filter((c) => c !== country)
    : [...selectedCountries.value, country];
};

const clearCountryFilters = () => {
  selectedCountries.value = [];
};
</script>

<template>
  <EmptyDiscountState v-if="visiblePromos.length === 0" type="events" />
  <div v-else class="space-y-6">
    <PromoFilters
      :available-countries="availableCountries"
      :selected-countries="selectedCountries"
      :filtered-count="filteredPromos.length"
      :total-count="visiblePromos.length"
      @country-toggle="toggleCountry"
      @clear-filters="clearCountryFilters"
    />

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <EventPromoCard
        v-for="promo in filteredPromos"
        :key="promo.id"
        :promo="promo"
      />
    </div>
  </div>
</template>
