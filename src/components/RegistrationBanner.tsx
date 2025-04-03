'use client';

export const RegistrationBanner = () => {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50" style={{ backgroundColor: '#2563EB' }}>
			<div className="container mx-auto px-4 py-3 text-center">
				<p className="font-medium text-white">
					⚠️ Important: Registration is required to attend meet.js Warsaw events. 
					<a 
						href="https://crossweb.pl/wydarzenia/meetjs-warsaw-with-sii-polska-kwiecien-2025/" 
						target="_blank" 
						rel="noopener noreferrer"
						className="underline ml-2 hover:text-blue-200 transition-colors"
					>
						Register here
					</a>
				</p>
			</div>
		</div>
	);
};
