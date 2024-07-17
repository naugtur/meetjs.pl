import { CITIES } from '@/content/cities';
import Link from 'next/link';

export const JoinUs = async () => {
	return (
		<section
			className="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between px-2 lg:px-8"
			id="joinus"
		>
			<div className="flex w-full flex-col gap-4 p-4">
				<h2 className="text-center text-3xl font-bold">Join Us</h2>
				<p className="text-center">Contact your local organizer!</p>
			</div>

			<div className="flex w-full flex-col p-4 md:flex-row">
				<div className="w-full md:w-1/2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 280 244"
						className="h-full w-full"
					>
						<polygon
							points="70.067,190.289 70.067,198.219 63.458,204.828 51.563,190.289 51.563,181.698 22.156,168.481 12.494,128.164 13.526,97.904 3.783,87.567 2,46.886 48.259,29.704 65.771,12.192 103.77,2.165 111.039,21.774 132.186,31.026 145.403,23.096 222.061,24.418 235.938,33.009 248.825,97.771 235.071,103.595 227.678,115.944 241.225,122.222 239.904,153.943 258,180.096 216.774,223.992 215.452,241.835 200.253,238.531 189.019,229.279 144.081,241.835 133.508,225.314 121.613,227.957 110.378,212.097"
							fill="#e0e0e0"
							stroke="#000000"
							strokeWidth="2"
						/>
						{CITIES.map((city, index) => (
							<g key={index}>
								<circle
									cx={city.pointPosition.x}
									cy={city.pointPosition.y}
									r="3"
									fill="red"
								/>
								<text
									x={city.textPosition.x}
									y={city.textPosition.y}
									fontSize="10"
									fill="black"
								>
									<Link href={city.href}>{city.name}</Link>
								</text>
							</g>
						))}
					</svg>
				</div>
				<div className="w-full md:w-1/2">
					<p className="pb-6">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
						vehicula. Orci sagittis eu volutpat odio facilisis mauris. Urna
						neque viverra justo nec ultrices dui sapien eget mi. In hac
						habitasse platea dictumst vestibulum rhoncus. Arcu bibendum at
						varius vel pharetra vel. Nulla malesuada pellentesque elit eget
						gravida cum sociis natoque penatibus. Ultricies lacus sed turpis
						tincidunt id aliquet risus. Urna neque viverra justo nec ultrices.
						Amet consectetur adipiscing elit duis tristique sollicitudin nibh
						sit amet.
					</p>
				</div>
			</div>
		</section>
	);
};
