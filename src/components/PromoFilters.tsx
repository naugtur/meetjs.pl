import { For, Show } from 'solid-js';
import { Check, Filter, X } from '@/lib/lucide';

interface PromoFiltersProps {
  availableCountries: string[];
  selectedCountries: string[];
  onCountryToggle: (country: string) => void;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export function PromoFilters(props: PromoFiltersProps) {
  return (
    <>
      <div class="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center gap-2">
          <Filter class="h-5 w-5 text-muted-foreground" />
          <span class="text-sm font-medium">Filter by country:</span>

          <div class="flex flex-wrap gap-2">
            <For each={props.availableCountries}>
              {(country) => (
                <button
                  class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${props.selectedCountries.includes(country) ? 'bg-purple text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                  onClick={() => props.onCountryToggle(country)}
                >
                  {country}
                  <Show when={props.selectedCountries.includes(country)}>
                    <Check class="ml-1 h-3 w-3" />
                  </Show>
                </button>
              )}
            </For>

            <Show when={props.selectedCountries.length > 0}>
              <button
                class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 hover:bg-red-200"
                onClick={props.onClearFilters}
              >
                Clear <X class="ml-1 h-3 w-3" />
              </button>
            </Show>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div class="text-sm text-muted-foreground">
        Showing {props.filteredCount} of {props.totalCount} active promotions
        <Show when={props.selectedCountries.length > 0}>
          {' '}
          (filtered by {props.selectedCountries.join(', ')})
        </Show>
      </div>
    </>
  );
}
