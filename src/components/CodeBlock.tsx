'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
	code: string;
	language?: string;
}

export const CodeBlock = ({ code, language = 'javascript' }: CodeBlockProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="group relative my-6">
			<button
				onClick={handleCopy}
				className="absolute right-4 top-4 z-10 rounded-lg bg-gray-700 p-2 text-white opacity-0 transition-opacity hover:bg-gray-600 group-hover:opacity-100"
				aria-label="Copy code"
			>
				{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			</button>
			<SyntaxHighlighter
				language={language}
				style={vscDarkPlus}
				customStyle={{
					borderRadius: '0.75rem',
					padding: '1.5rem',
					fontSize: '0.875rem',
					margin: 0,
				}}
				showLineNumbers
			>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};
