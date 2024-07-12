'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { PARTNERS } from '@/content/partners';

export const PartnersCarousel = () => {
	return (
		<Carousel
			opts={{
				loop: true,
			}}
			plugins={[Autoplay({ playOnInit: true, delay: 2000 })]}
		>
			<CarouselContent className="items-center">
				{PARTNERS.map((partner) => (
					<CarouselItem className="basis-full md:basis-1/6" key={partner.alt}>
						<Link
							href={partner.href}
							className="flex items-center justify-center"
							target="_blank"
						>
							<Image
								src={partner.src}
								alt={partner.alt}
								width={114}
								height={48}
							/>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
