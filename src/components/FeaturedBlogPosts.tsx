'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS, formatBlogDate } from '@/content/blogPosts';

export const FeaturedBlogPosts = () => {
	// Get featured or latest posts
	const featuredPosts = BLOG_POSTS.filter((post) => post.featured)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	// If there aren't enough featured posts, add the latest ones
	const postsToShow =
		featuredPosts.length >= 3
			? featuredPosts
			: [
					...featuredPosts,
					...BLOG_POSTS.filter((post) => !post.featured)
						.sort(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
						)
						.slice(0, 3 - featuredPosts.length),
				];

	return (
		<section
			className="w-full bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-800"
			id="blog"
		>
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
						Latest Articles
					</h2>
					<p className="text-lg text-gray-700 dark:text-gray-300">
						Insights, tutorials, and updates from the JavaScript community
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{postsToShow.map((post) => (
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

								<h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple dark:text-white dark:group-hover:text-green">
									{post.title}
								</h3>

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

				<div className="mt-12 text-center">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 font-semibold text-white transition-all hover:bg-purple/90 hover:shadow-lg dark:bg-green dark:text-black dark:hover:bg-green/90"
					>
						View All Articles
						<ArrowRight className="h-5 w-5" />
					</Link>
				</div>
			</div>
		</section>
	);
};
