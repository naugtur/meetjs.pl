'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Calendar, Tag, User } from 'lucide-react';

// Mock blog data - in a real implementation, this would come from a CMS or API
const BLOG_POSTS = [
  {
    id: 'getting-started-with-meetjs',
    title: 'Getting Started with meet.js: A Guide for New Attendees',
    excerpt: 'New to meet.js? This guide will help you make the most of your first meetup experience.',
    date: '2025-01-15',
    author: 'Kamil Dzieniszewski',
    authorImage: 'https://avatars.githubusercontent.com/u/12345678',
    tags: ['community', 'beginners', 'meetups'],
    image: '/conference.jpg',
    readTime: '5 min read',
  },
  {
    id: 'typescript-best-practices-2025',
    title: 'TypeScript Best Practices for 2025',
    excerpt: 'Discover the latest TypeScript patterns and practices that will make your code more maintainable.',
    date: '2025-02-20',
    author: 'Zbyszek Tenerowicz',
    authorImage: 'https://avatars.githubusercontent.com/u/87654321',
    tags: ['typescript', 'best-practices', 'development'],
    image: '/conference.jpg',
    readTime: '8 min read',
  },
  {
    id: 'react-19-features',
    title: 'What\'s New in React 19: Features You Should Know',
    excerpt: 'React 19 brings exciting new features. Learn how to leverage them in your projects.',
    date: '2025-03-10',
    author: 'Stanisław Synowiec',
    authorImage: 'https://avatars.githubusercontent.com/u/13579246',
    tags: ['react', 'javascript', 'frontend'],
    image: '/conference.jpg',
    readTime: '7 min read',
  },
  {
    id: 'meetjs-summit-2025-recap',
    title: 'meet.js Summit 2025: Event Recap and Highlights',
    excerpt: 'Missed the meet.js Summit? Here\'s a comprehensive recap of the talks, workshops, and networking opportunities.',
    date: '2025-04-05',
    author: 'Olaf Krawczyk',
    authorImage: 'https://avatars.githubusercontent.com/u/24612562',
    tags: ['events', 'summit', 'conference'],
    image: '/conference.jpg',
    readTime: '10 min read',
  },
];

// Tags for filtering
const ALL_TAGS = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags))).sort();

export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts based on selected tags and search term
  const filteredPosts = BLOG_POSTS.filter(post => {
    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => post.tags.includes(tag))) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">meet.js Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Stay updated with the latest JavaScript trends, event recaps, and community news
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8 flex flex-col gap-6">
        {/* Search bar */}
        <div className="mx-auto w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
              aria-label="Search articles"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="rounded-full px-3 py-1 text-sm text-blue hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {/* Blog posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <article key={post.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date)}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <Link href={`/blog/${post.id}`} className="hover:text-blue">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
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
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                      className: 'text-blue hover:bg-blue/10 hover:text-blue'
                    })}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="mb-4 text-xl">No articles found matching your criteria</p>
          <button 
            onClick={() => {
              setSelectedTags([]);
              setSearchTerm('');
            }}
            className="text-blue hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
