import { Check, Filter, X } from 'lucide-react';

interface PromoFiltersProps {
	availableCountries: string[];
	selectedCountries: string[];
	onCountryToggle: (country: string) => void;
	onClearFilters: () => void;
	filteredCount: number;
	totalCount: number;
}

export function PromoFilters({
	availableCountries,
	selectedCountries,
	onCountryToggle,
	onClearFilters,
	filteredCount,
	totalCount,
}: PromoFiltersProps) {
	return (
		<>
			<div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
				<div className="flex items-center gap-2">
					<Filter className="h-5 w-5 text-muted-foreground" />
					<span className="text-sm font-medium">Filter by country:</span>

					<div className="flex flex-wrap gap-2">
						{availableCountries.map((country) => (
							<button
								key={country}
								className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${selectedCountries.includes(country) ? 'bg-purple text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
								onClick={() => onCountryToggle(country)}
							>
								{country}
								{selectedCountries.includes(country) && (
									<Check className="ml-1 h-3 w-3" />
								)}
							</button>
						))}

						{selectedCountries.length > 0 && (
							<button
								className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 hover:bg-red-200"
								onClick={onClearFilters}
							>
								Clear <X className="ml-1 h-3 w-3" />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Results count */}
			<div className="text-sm text-muted-foreground">
				Showing {filteredCount} of {totalCount} active promotions
				{selectedCountries.length > 0 && (
					<> (filtered by {selectedCountries.join(', ')})</>
				)}
			</div>
		</>
	);
}
