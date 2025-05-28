import { Metadata } from 'next';
import { BLOG_POSTS } from '@/content/blogPosts';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

type LayoutProps = {
  children: React.ReactNode;
  params: { slug: string };
};

export default function BlogPostLayout({ children }: LayoutProps) {
  return children;
} 