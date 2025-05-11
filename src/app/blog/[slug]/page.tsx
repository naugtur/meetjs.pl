'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, User, ArrowLeft, Share2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

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
    content: `
      <p>Welcome to meet.js! If you're reading this, you're probably considering attending your first JavaScript meetup in Poland. That's great news! The meet.js community has been bringing together JavaScript developers since 2011, and we're excited to have you join us.</p>
      
      <h2>What is meet.js?</h2>
      <p>meet.js is Poland's largest JavaScript community, organizing regular meetups in cities across the country. Our events are 100% non-commercial and free to attend, focusing on knowledge sharing and community building.</p>
      
      <h2>Before the Meetup</h2>
      <p>Here are some tips to prepare for your first meet.js event:</p>
      <ul>
        <li><strong>Register early</strong> - Popular meetups fill up quickly!</li>
        <li><strong>Join our Discord</strong> - Connect with the community before the event</li>
        <li><strong>Check the agenda</strong> - Come prepared with questions for the speakers</li>
        <li><strong>Bring business cards</strong> - Great for networking opportunities</li>
      </ul>
      
      <h2>During the Meetup</h2>
      <p>Make the most of your experience:</p>
      <ul>
        <li><strong>Arrive early</strong> - Use the time to network and find a good seat</li>
        <li><strong>Participate actively</strong> - Ask questions during Q&A sessions</li>
        <li><strong>Take notes</strong> - You'll hear about many new tools and concepts</li>
        <li><strong>Network</strong> - The breaks between talks are perfect for meeting fellow developers</li>
      </ul>
      
      <h2>After the Meetup</h2>
      <p>The value of meet.js extends beyond the event itself:</p>
      <ul>
        <li><strong>Follow up</strong> - Connect with people you met on LinkedIn or GitHub</li>
        <li><strong>Review your notes</strong> - Research topics that interested you</li>
        <li><strong>Provide feedback</strong> - Organizers appreciate hearing your thoughts</li>
        <li><strong>Consider speaking</strong> - Have knowledge to share? Propose a talk for a future meetup!</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>meet.js is more than just a series of technical talks—it's a community of passionate JavaScript developers eager to learn and share. Your first meetup is just the beginning of what we hope will be a rewarding journey with the Polish JavaScript community.</p>
      
      <p>We look forward to seeing you at the next meet.js event!</p>
    `,
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
    content: '<p>This is a placeholder for the TypeScript best practices article content.</p>',
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
    content: '<p>This is a placeholder for the React 19 features article content.</p>',
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
    content: '<p>This is a placeholder for the meet.js Summit 2025 recap article content.</p>',
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(post => post.id === slug);
  
  if (!post) {
    notFound();
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link', error));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/blog" 
        className={buttonVariants({
          variant: 'ghost',
          className: 'mb-8 flex items-center gap-2'
        })}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all articles
      </Link>
      
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight">{post.title}</h1>
          
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                href={`/blog?tag=${tag}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div 
          className="prose prose-lg mx-auto max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={sharePost}
            className={buttonVariants({
              variant: 'outline',
              className: 'flex items-center gap-2'
            })}
          >
            <Share2 className="h-4 w-4" />
            Share this article
          </button>
        </div>
        
        {/* Related posts - would be implemented in a real blog */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.filter(p => p.id !== post.id)
              .slice(0, 2)
              .map(relatedPost => (
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
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
      </article>
    </div>
  );
}
