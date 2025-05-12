'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
	Calendar,
	Tag,
	User,
	ArrowLeft,
	Share2,
	Clock,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
	BLOG_POSTS,
	getRelatedPosts,
	formatBlogDate,
} from '@/content/blogPosts';

// Metadata generator function
async function generateMetadata({ params }: { params: { slug: string } }) {
	const post = BLOG_POSTS.find((post) => post.id === params.slug);

	if (!post) {
		return {
			title: 'Post Not Found | meet.js Blog',
			description: 'The requested blog post could not be found.',
		};
	}

	return {
		title: `${post.title} | meet.js Blog`,
		description: post.excerpt,
		keywords: [
			...post.tags,
			'JavaScript',
			'meet.js',
			'Poland',
			'web development',
		],
		openGraph: {
			title: post.title,
			description: post.excerpt,
			url: `https://meetjs.pl/blog/${post.id}`,
			siteName: 'meet.js',
			locale: 'en_US',
			type: 'article',
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
			images: [
				{
					url: `https://meetjs.pl${post.image}`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.excerpt,
			images: [`https://meetjs.pl${post.image}`],
		},
	};
}

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

	// Calculate estimated reading time
	const calculateReadingTime = (content: string): string => {
		const wordsPerMinute = 200;
		const textOnly = content.replace(/<[^>]*>/g, '');
		const wordCount = textOnly.split(/\s+/).length;
		const readingTime = Math.ceil(wordCount / wordsPerMinute);
		return `${readingTime} min read`;
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-12">
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
				className="fixed left-0 top-0 z-50 h-1 bg-purple transition-all duration-300 dark:bg-green"
				style={{ width: `${readingProgress}%` }}
				role="progressbar"
				aria-valuenow={readingProgress}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Reading progress"
			/>

			<Link
				href="/blog"
				className={buttonVariants({
					variant: 'ghost',
					className: 'mb-8 flex items-center gap-2',
				})}
			>
				<ArrowLeft className="h-4 w-4" />
				Back to all articles
			</Link>

			<article ref={articleRef} className="mx-auto max-w-3xl">
				{/* Header */}
				<header className="mb-8 text-center">
					<div className="mb-4 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
						<span className="flex items-center gap-1">
							<Calendar className="h-4 w-4" />
							{formatBlogDate(post.date)}
						</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							{post.readTime}
						</span>
					</div>

					<h1 className="mb-6 text-4xl font-bold leading-tight">
						{post.title}
					</h1>

					<div className="mb-6 flex flex-wrap justify-center gap-2">
						{post.tags.map((tag) => (
							<Link
								key={tag}
								href={`/blog?tag=${tag}`}
								className="rounded-full bg-purple/20 px-3 py-1 text-sm text-purple hover:bg-purple/30 dark:bg-green/20 dark:text-green dark:hover:bg-green/30"
							>
								#{tag}
							</Link>
						))}
					</div>

					<div className="flex items-center justify-center gap-3">
						<div className="relative h-10 w-10 overflow-hidden rounded-full">
							<Image
								src={post.authorImage}
								alt={post.author}
								fill
								className="object-cover"
							/>
						</div>
						<span className="font-medium">{post.author}</span>
					</div>
				</header>

				{/* Featured image */}
				<div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
					<Image
						src={post.image}
						alt={post.title}
						fill
						sizes="(max-width: 768px) 100vw, 800px"
						className="object-cover"
						priority
						placeholder="blur"
						blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmzHMVs7vT5beW3EsSsA8bKCCPo8H7iqNQiiJJGwAHJoPQo//2Q=="
					/>
				</div>

				{/* Content */}
				<div
					className="prose prose-lg dark:prose-invert prose-headings:text-purple dark:prose-headings:text-green prose-a:text-purple dark:prose-a:text-green prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-strong:text-purple dark:prose-strong:text-green mx-auto max-w-none"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				{/* Author bio */}
				<div className="mt-12 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
					<div className="flex items-center gap-4">
						<div className="relative h-16 w-16 overflow-hidden rounded-full">
							<Image
								src={post.authorImage}
								alt={post.author}
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<h3 className="text-xl font-bold">{post.author}</h3>
							<p className="text-gray-600 dark:text-gray-300">
								JavaScript enthusiast and meet.js community member
							</p>
						</div>
					</div>
				</div>

				{/* Share button */}
				<div className="mt-8 flex justify-center">
					<button
						onClick={sharePost}
						className={buttonVariants({
							className:
								'flex items-center gap-2 bg-purple text-black hover:bg-purple/80 dark:bg-green dark:text-black dark:hover:bg-green/80',
						})}
					>
						<Share2 className="h-4 w-4" />
						Share this article
					</button>
				</div>

				{/* Related posts */}
				{relatedPosts.length > 0 && (
					<div className="mt-16">
						<h2 className="mb-6 text-2xl font-bold">You might also like</h2>
						<div className="grid gap-6 sm:grid-cols-2">
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.id}`}
									className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
								>
									<div className="relative h-40 w-full">
										<Image
											src={relatedPost.image}
											alt={relatedPost.title}
											fill
											sizes="(max-width: 640px) 100vw, 300px"
											className="object-cover transition-transform duration-300 group-hover:scale-105"
											loading="lazy"
										/>
									</div>
									<div className="p-4">
										<h3 className="mb-2 text-lg font-bold group-hover:text-blue">
											{relatedPost.title}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											{relatedPost.excerpt}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}

				{/* Post navigation */}
				<nav className="mt-12 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
					{(() => {
						const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
						const prevPost =
							currentIndex < BLOG_POSTS.length - 1
								? BLOG_POSTS[currentIndex + 1]
								: null;
						const nextPost =
							currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;

						return (
							<>
								{prevPost ? (
									<Link
										href={`/blog/${prevPost.id}`}
										className="flex items-center gap-2 text-gray-600 hover:text-blue dark:text-gray-300"
									>
										<ChevronLeft className="h-4 w-4" />
										<span className="max-w-[200px] truncate">
											{prevPost.title}
										</span>
									</Link>
								) : (
									<div></div>
								)}

								{nextPost ? (
									<Link
										href={`/blog/${nextPost.id}`}
										className="flex items-center gap-2 text-right text-gray-600 hover:text-blue dark:text-gray-300"
									>
										<span className="max-w-[200px] truncate">
											{nextPost.title}
										</span>
										<ChevronRight className="h-4 w-4" />
									</Link>
								) : (
									<div></div>
								)}
							</>
						);
					})()}
				</nav>
			</article>
		</div>
	);
}
