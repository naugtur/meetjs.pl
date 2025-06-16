'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
	clickable?: boolean;
}

export const Logo = ({ clickable = true }: LogoProps) => {
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const handleRightClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setContextMenuPosition({ x: e.clientX, y: e.clientY });
		setShowContextMenu(true);
	};

	const handleClickOutside = () => {
		setShowContextMenu(false);
	};

	const logoImage = (
		<Image
			src="./logo.svg"
			alt="meet.js Logo"
			width={150}
			height={40}
			className="p-4"
			onContextMenu={handleRightClick}
			style={{ userSelect: 'none' }}
		/>
	);

	return (
		<>
			{clickable ? (
				<Link href="/" className="flex items-center">
					{logoImage}
				</Link>
			) : (
				logoImage
			)}

			{showContextMenu && (
				<>
					<div className="fixed inset-0 z-[60]" onClick={handleClickOutside} />
					<div
						className="fixed z-[70] min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
						style={{
							left: contextMenuPosition.x,
							top: contextMenuPosition.y,
						}}
					>
						<div className="border-b border-gray-100 px-4 py-2 text-sm text-gray-700">
							<div className="font-medium">meet.js Logo</div>
							<div className="mt-1 text-xs text-gray-500">
								Want to download our logo?
							</div>
						</div>
						<Link
							href="/brand"
							onClick={handleClickOutside}
							className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							📦 Go to Brand Assets
						</Link>
					</div>
				</>
			)}
		</>
	);
};
