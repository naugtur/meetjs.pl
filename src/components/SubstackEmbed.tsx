'use client';

import { Newspaper } from 'lucide-react';

export const SubstackEmbed = () => {
	return (
		<div className="mt-8 border-t pt-6">
			<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
				<Newspaper className="h-5 w-5 text-[#FF6719]" />
				Subscribe to our Newsletter
			</h3>
			<div className="flex justify-center md:justify-start">
				<iframe
					src="https://meetjs.substack.com/embed"
					width="100%"
					height="320"
					style={{ border: '1px solid #EEE' }}
					frameBorder="0"
					scrolling="no"
					title="meet.js Newsletter"
					className="max-w-[480px]"
				/>
			</div>
		</div>
	);
};
