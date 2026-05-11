'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import { BLOG_POSTS, getAllTags, formatBlogDate } from '@/content/blogPosts';

// Constants
const POSTS_PER_PAGE = 9;
const ALL_TAGS = getAllTags();

export default function BlogPage() {
	const searchParams = useSearchParams();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	// Initialize from URL parameters
	useEffect(() => {
		const tagParam = searchParams.get('tag');
		if (tagParam && ALL_TAGS.includes(tagParam)) {
			setSelectedTags([tagParam]);
		}

		const searchParam = searchParams.get('search');
		if (searchParam) {
			setSearchTerm(searchParam);
		}

		const pageParam = searchParams.get('page');
		if (pageParam && !isNaN(Number(pageParam))) {
			setCurrentPage(Number(pageParam));
		}
	}, [searchParams]);

	// Filter posts based on selected tags and search term
	const filteredPosts = BLOG_POSTS.filter((post) => {
		// Filter by tags
		if (
			selectedTags.length > 0 &&
			!selectedTags.some((tag) => post.tags.includes(tag))
		) {
			return false;
		}

		// Filter by search term
		if (
			searchTerm &&
			!post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	// Sort posts by date (newest first)
	const sortedPosts = [...filteredPosts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	// Pagination
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
	const paginatedPosts = sortedPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE,
	);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
		setCurrentPage(1); // Reset to first page when changing filters
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentPage(1); // Reset to first page when searching
	};

	const clearFilters = () => {
		setSelectedTags([]);
		setSearchTerm('');
		setCurrentPage(1);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			{/* JSON-LD structured data for blog */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Blog',
						name: 'meet.js Blog',
						description:
							'Articles, tutorials and event recaps from the largest JavaScript community in Poland.',
						url: 'https://meetjs.pl/blog',
						publisher: {
							'@type': 'Organization',
							name: 'meet.js',
							logo: {
								'@type': 'ImageObject',
								url: 'https://meetjs.pl/logo.png',
							},
						},
						blogPost: sortedPosts.slice(0, 10).map((post) => ({
							'@type': 'BlogPosting',
							headline: post.title,
							description: post.excerpt,
							datePublished: post.date,
							author: {
								'@type': 'Person',
								name: post.author,
							},
							url: `https://meetjs.pl/blog/${post.id}`,
						})),
					}),
				}}
			/>

			<div className="mx-auto max-w-7xl px-4 py-16">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
						JavaScript Blog
					</h1>
					<p className="mx-auto max-w-2xl text-xl text-gray-700 dark:text-gray-300">
						Insights, tutorials, and updates from the meet.js community
					</p>
				</div>

				{/* Search and filters */}
				<div className="mb-12 space-y-6">
					{/* Search bar */}
					<div className="mx-auto max-w-2xl">
						<form onSubmit={handleSearch} className="relative">
							<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search articles..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-lg transition-colors focus:border-purple focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-green"
								aria-label="Search articles"
							/>
						</form>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap justify-center gap-3">
						{ALL_TAGS.map((tag) => (
							<button
								key={tag}
								onClick={() => toggleTag(tag)}
								className={`rounded-full px-5 py-2 font-semibold transition-all ${
									selectedTags.includes(tag)
										? 'bg-purple text-white shadow-lg dark:bg-green dark:text-black'
										: 'bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'
								}`}
								aria-pressed={selectedTags.includes(tag)}
							>
								#{tag}
							</button>
						))}
						{(selectedTags.length > 0 || searchTerm) && (
							<button
								onClick={clearFilters}
								className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2 font-semibold text-red-600 shadow transition-all hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
								aria-label="Clear all filters"
							>
								<X className="h-4 w-4" />
								Clear
							</button>
						)}
					</div>

					{/* Results count */}
					<div className="text-center text-gray-600 dark:text-gray-400">
						Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
					</div>
				</div>

				{/* Blog posts grid */}
				{filteredPosts.length > 0 ? (
					<>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{paginatedPosts.map((post) => (
								<Link
									key={post.id}
									href={`/blog/${post.id}`}
									className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
								>
									<div className="relative h-56 w-full overflow-hidden">
										<Image
											src={post.image}
											alt={post.title}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="object-cover transition-transform duration-300 group-hover:scale-110"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
										<div className="absolute bottom-4 left-4 right-4">
											<div className="flex flex-wrap gap-2">
												{post.tags.slice(0, 2).map((tag) => (
													<span
														key={tag}
														className="rounded-full bg-purple px-3 py-1 text-xs font-semibold text-white dark:bg-green"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>

									<div className="flex flex-1 flex-col p-6">
										<div className="mb-3 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
											<time dateTime={post.date}>{formatBlogDate(post.date)}</time>
											<span>•</span>
											<span>{post.readTime}</span>
										</div>

										<h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple dark:text-white dark:group-hover:text-green">
											{post.title}
										</h2>

										<p className="mb-4 line-clamp-2 flex-1 text-gray-700 dark:text-gray-300">
											{post.excerpt}
										</p>

										<div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
											<div className="flex items-center gap-3">
												<div className="relative h-10 w-10 overflow-hidden rounded-full">
													<Image
														src={post.authorImage}
														alt={post.author}
														fill
														className="object-cover"
													/>
												</div>
												<span className="font-semibold text-gray-900 dark:text-white">
													{post.author}
												</span>
											</div>
											<ArrowRight className="h-5 w-5 text-purple transition-transform group-hover:translate-x-1 dark:text-green" />
										</div>
									</div>
								</Link>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-16 flex justify-center gap-2">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`h-12 w-12 rounded-full font-semibold transition-all ${
											currentPage === page
												? 'bg-purple text-white shadow-lg dark:bg-green dark:text-black'
												: 'bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'
										}`}
										aria-label={`Page ${page}`}
										aria-current={currentPage === page ? 'page' : undefined}
									>
										{page}
									</button>
								))}
							</div>
						)}
					</>
				) : (
					<div className="py-20 text-center">
						<div className="mx-auto max-w-md rounded-2xl bg-white p-12 shadow-lg dark:bg-gray-800">
							<p className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
								No articles found
							</p>
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								Try adjusting your search or filters
							</p>
							<button
								onClick={clearFilters}
								className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 font-semibold text-white transition-all hover:bg-purple/90 dark:bg-green dark:text-black"
							>
								<X className="h-4 w-4" />
								Clear all filters
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
