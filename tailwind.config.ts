import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/components/**/*.{ts,tsx,mdx}',
		'./src/app/**/*.{ts,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				purple: '#2b1932',
				blue: '#219eab',
				green: '#bcd35d',
			},
		},
	},
	plugins: [],
};
export default config;
