'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowLeft, Share2, Clock, ArrowRight } from 'lucide-react';
import {
	BLOG_POSTS,
	getRelatedPosts,
	formatBlogDate,
} from '@/content/blogPosts';
import { BlogContent } from '@/components/BlogContent';

export default function BlogPostPage() {
	const { slug } = useParams();
	const post = BLOG_POSTS.find((post) => post.id === (slug as string));
	const [readingProgress, setReadingProgress] = useState(0);
	const articleRef = useRef<HTMLElement>(null);

	// Get related posts based on tags
	const relatedPosts = getRelatedPosts(slug as string, 2);

	useEffect(() => {
		if (!post) return;

		const handleScroll = () => {
			if (!articleRef.current) return;

			const element = articleRef.current;
			const totalHeight = element.clientHeight;
			const windowHeight = window.innerHeight;
			const scrollTop = window.scrollY || document.documentElement.scrollTop;

			if (totalHeight - windowHeight === 0) {
				setReadingProgress(100);
			} else {
				const progress = (scrollTop / (totalHeight - windowHeight)) * 100;
				setReadingProgress(Math.min(100, Math.max(0, progress)));
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [post]);

	if (!post) {
		notFound();
	}

	const sharePost = () => {
		if (navigator.share) {
			navigator
				.share({
					title: post.title,
					text: post.excerpt,
					url: window.location.href,
				})
				.catch((error) => console.log('Error sharing', error));
		} else {
			navigator.clipboard
				.writeText(window.location.href)
				.then(() => alert('Link copied to clipboard!'))
				.catch((error) => console.log('Error copying link', error));
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			{/* JSON-LD structured data for blog post */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.title,
						description: post.excerpt,
						image: `https://meetjs.pl${post.image}`,
						datePublished: post.date,
						dateModified: post.date,
						author: {
							'@type': 'Person',
							name: post.author,
							url: `https://meetjs.pl/authors/${post.author.toLowerCase().replace(/\s+/g, '-')}`,
						},
						publisher: {
							'@type': 'Organization',
							name: 'meet.js',
							logo: {
								'@type': 'ImageObject',
								url: 'https://meetjs.pl/logo.png',
							},
						},
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': `https://meetjs.pl/blog/${post.id}`,
						},
						keywords: post.tags.join(', '),
					}),
				}}
			/>

			{/* Reading progress bar */}
			<div
				className="fixed left-0 top-0 z-50 h-2 bg-gradient-to-r from-purple to-blue transition-all duration-300 dark:from-green dark:to-blue"
				style={{ width: `${readingProgress}%` }}
				role="progressbar"
				aria-valuenow={readingProgress}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Reading progress"
			/>

			<div className="mx-auto max-w-4xl px-4 py-12">
				<Link
					href="/blog"
					className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:text-white"
				>
					<ArrowLeft className="h-5 w-5" />
					Back to Blog
				</Link>

				<article ref={articleRef} className="overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-800">
					{/* Hero Image */}
					<div className="relative h-[500px] w-full">
						<Image
							src={post.image}
							alt={post.title}
							fill
							sizes="100vw"
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
							<div className="mb-4 flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/blog?tag=${tag}`}
										className="rounded-full bg-purple px-4 py-2 font-semibold text-white transition-all hover:bg-purple/90 dark:bg-green dark:text-black"
									>
										#{tag}
									</Link>
								))}
							</div>
							<h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
								{post.title}
							</h1>
							<div className="flex items-center gap-4 text-white/90">
								<div className="flex items-center gap-2">
									<Calendar className="h-5 w-5" />
									<time dateTime={post.date}>{formatBlogDate(post.date)}</time>
								</div>
								<span>•</span>
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									<span>{post.readTime}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-8 md:p-12">
						{/* Author */}
						<div className="mb-12 flex items-center gap-4 border-b border-gray-200 pb-8 dark:border-gray-700">
							<div className="relative h-16 w-16 overflow-hidden rounded-full">
								<Image
									src={post.authorImage}
									alt={post.author}
									fill
									className="object-cover"
								/>
							</div>
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Written by</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">{post.author}</p>
							</div>
						</div>

						{/* Article Content */}
						<BlogContent content={post.content} />

						{/* Share Button */}
						<div className="mt-12 flex justify-center border-t border-gray-200 pt-8 dark:border-gray-700">
							<button
								onClick={sharePost}
								className="inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-purple/90 hover:shadow-xl dark:bg-green dark:text-black"
							>
								<Share2 className="h-5 w-5" />
								Share this article
							</button>
						</div>
					</div>
				</article>

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<div className="mt-16">
						<h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
							Continue Reading
						</h2>
						<div className="grid gap-8 md:grid-cols-2">
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.id}`}
									className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
								>
									<div className="relative h-56 w-full overflow-hidden">
										<Image
											src={relatedPost.image}
											alt={relatedPost.title}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover transition-transform duration-300 group-hover:scale-110"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									</div>
									<div className="p-6">
										<h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple dark:text-white dark:group-hover:text-green">
											{relatedPost.title}
										</h3>
										<p className="line-clamp-2 text-gray-700 dark:text-gray-300">
											{relatedPost.excerpt}
										</p>
										<div className="mt-4 flex items-center gap-2 font-semibold text-purple dark:text-green">
											Read more
											<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
