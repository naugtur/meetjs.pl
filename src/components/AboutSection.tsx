import Image from 'next/image';

export const AboutSection = () => {
	return (
		<section
			className="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col items-center justify-between px-2 md:flex-row lg:px-8"
			id="about"
		>
			<div className="w-full md:w-1/2">
				<Image
					src="/conference.jpg"
					alt=""
					width={2000}
					height={1333}
					priority={false}
				/>
			</div>
			<div className="w-full md:w-1/2">
				<h2 className="text-center text-3xl font-bold">About meet.js</h2>
				<div className="flex gap-4 p-4">
					<p>
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
