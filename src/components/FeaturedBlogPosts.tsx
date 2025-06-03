'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
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
			className="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between p-12 px-2 lg:px-8"
			id="blog"
		>
			<div className="flex w-full flex-col gap-4 p-4">
				<h2 className="text-center text-3xl font-bold">Latest from Our Blog</h2>
				<p className="text-center">
					Stay updated with the latest JavaScript trends, event recaps, and
					community news
				</p>

				<div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{postsToShow.map((post) => (
						<article
							key={post.id}
							className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
						>
							<div className="relative h-48 w-full">
								<Image
									src={post.image}
									alt={post.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover"
									loading="lazy"
									placeholder="blur"
									blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmzHMVs7vT5beW3EsSsA8bKCCPo8H7iqNQiiJJGwAHJoPQo//2Q=="
								/>
							</div>
							<div className="p-5">
								<div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{formatBlogDate(post.date)}
									</span>
									<span>•</span>
									<span>{post.readTime}</span>
								</div>

								<h3 className="mb-2 text-xl font-bold leading-tight">
									<Link href={`/blog/${post.id}`} className="hover:text-blue">
										{post.title}
									</Link>
								</h3>

								<p className="mb-4 text-gray-600 dark:text-gray-300">
									{post.excerpt}
								</p>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="relative h-8 w-8 overflow-hidden rounded-full">
											<Image
												src={post.authorImage}
												alt={post.author}
												fill
												className="object-cover"
											/>
										</div>
										<span className="text-sm font-medium">{post.author}</span>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>

				<div className="mx-auto mt-8">
					<Link
						href="/blog"
						className={buttonVariants({
							className:
								'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
						})}
					>
						View all articles
					</Link>
				</div>
			</div>
		</section>
	);
};
