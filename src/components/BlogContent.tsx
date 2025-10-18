'use client';

interface BlogContentProps {
	content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
	return (
		<div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-purple dark:prose-a:text-green prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-purple dark:prose-code:bg-gray-800 dark:prose-code:text-green prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:p-4">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};
