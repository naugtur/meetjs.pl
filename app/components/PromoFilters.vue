<script setup lang="ts">
import { Check, Filter, X } from 'lucide-vue-next';

defineProps<{
  availableCountries: string[];
  selectedCountries: string[];
  filteredCount: number;
  totalCount: number;
}>();

defineEmits<{ countryToggle: [country: string]; clearFilters: [] }>();
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
  >
    <div class="flex items-center gap-2">
      <Filter class="h-5 w-5 text-muted-foreground" />
      <span class="text-sm font-medium">Filter by country:</span>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="country in availableCountries"
          :key="country"
          :class="`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${selectedCountries.includes(country) ? 'bg-purple text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`"
          @click="$emit('countryToggle', country)"
        >
          {{ country
          }}<Check
            v-if="selectedCountries.includes(country)"
            class="ml-1 h-3 w-3"
          />
        </button>

        <button
          v-if="selectedCountries.length > 0"
          class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 hover:bg-red-200"
          @click="$emit('clearFilters')"
        >
          Clear <X class="ml-1 h-3 w-3" />
        </button>
      </div>
    </div>
  </div>

  <!-- Results count -->
  <div class="text-sm text-muted-foreground">
    Showing {{ filteredCount }} of {{ totalCount }} active promotions{{
      selectedCountries.length > 0
        ? ` (filtered by ${selectedCountries.join(', ')})`
        : ''
    }}
  </div>
</template>
