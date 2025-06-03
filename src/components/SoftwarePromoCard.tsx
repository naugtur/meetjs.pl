'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Promo } from '@/types/promo';
import { Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const getDomain = (url: string) => {
	try {
		const domain = new URL(url).hostname;
		return domain.startsWith('www.') ? domain.substring(4) : domain;
	} catch (e) {
		console.error('Failed to extract domain from URL:', e);
		return url;
	}
};

// Format date to be more readable
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

interface SoftwarePromoCardProps {
	promo: Promo;
}

export function SoftwarePromoCard({ promo }: SoftwarePromoCardProps) {
	const [copied, setCopied] = useState(false);
	const expiryDate = formatDate(promo.expiresAt);

	const copyDiscountCode = async () => {
		if (promo.discountCode) {
			await navigator.clipboard.writeText(promo.discountCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
			<div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
				{promo.image ? (
					<div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
						<Image
							src={promo.image}
							alt={`${promo.message} logo`}
							fill
							className="object-contain p-2"
						/>
					</div>
				) : (
					<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl text-white">
						{promo.icon || '🖥️'}
					</div>
				)}

				<div className="flex-1">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						{promo.name}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{promo.message}
					</p>
				</div>
			</div>

			<div className="p-6">
				{promo.description && (
					<div className="mb-6">
						<p className="leading-relaxed text-gray-700 dark:text-gray-300">
							{promo.description}
						</p>
					</div>
				)}

				{promo.discountCode && (
					<div className="mb-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-900/20 dark:to-blue-900/20">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Discount Code
								</p>
								<p className="font-mono text-lg font-bold text-green-600 dark:text-green-400">
									{promo.discountCode}
								</p>
							</div>
							<button
								onClick={copyDiscountCode}
								className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							>
								<Copy className="h-4 w-4" />
								{copied ? 'Copied!' : 'Copy'}
							</button>
						</div>
					</div>
				)}

				<div className="mb-6 grid grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
							Valid Until
						</p>
						<p className="font-medium text-gray-900 dark:text-white">
							{expiryDate}
						</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
							Availability
						</p>
						<p className="font-medium text-gray-900 dark:text-white">
							{promo.country || 'Global'}
						</p>
					</div>
				</div>

				<div className="mb-6 space-y-3">
					{promo.eventLink && (
						<div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
							<div>
								<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Product Website
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{getDomain(promo.eventLink)}
								</p>
							</div>
							<a
								href={promo.eventLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
							>
								<ExternalLink className="h-4 w-4" />
							</a>
						</div>
					)}
				</div>
			</div>

			<div className="border-t border-gray-100 p-6 dark:border-gray-700">
				<Link
					href={promo.ticketLink}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-center font-semibold text-white shadow transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg"
				>
					{promo.cta}
				</Link>
			</div>
		</div>
	);
}
