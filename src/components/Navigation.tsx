'use client';

import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { FaBars, FaX } from 'react-icons/fa6';
import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';

const navigationLinks = [
	{ name: 'events', href: '#', current: false },
	{ name: 'about', href: '#', current: false },
	{ name: 'contact', href: '#', current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const Navigation = () => {
	return (
		<Disclosure as="nav" className="sticky top-0 bg-purple">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="flex flex-1 items-center justify-between sm:items-stretch">
								<div className="flex items-center">
									<Logo />
								</div>
								<ul className="hidden items-center justify-center gap-4 sm:flex">
									{navigationLinks.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? 'bg-gray-900 text-white'
													: 'text-white hover:bg-green/80 hover:text-purple',
												'rounded-md px-3 py-2 font-medium',
											)}
											aria-current={item.current ? 'page' : undefined}
										>
											{item.name}
										</Link>
									))}
								</ul>
								<div className="hidden items-center justify-center md:flex">
									<SocialLinks />
								</div>
							</div>
							<div className="inset-y-0 flex items-center p-4 sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<FaX className="block h-6 w-6" aria-hidden="true" />
									) : (
										<FaBars className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigationLinks.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium',
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</DisclosureButton>
							))}
							<div className="flex justify-center">
								<SocialLinks />
							</div>
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
};
