'use client';

import { useState } from 'react';
import styles from './AnniversaryBanner.module.css';
import { FaTimes } from 'react-icons/fa';

const AnniversaryBanner = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className={`${styles.banner} ${isVisible ? styles.visible : ''}`}>
			<div className={styles.content}>
				<span role="img" aria-label="party popper" className={styles.emoji}>
					🎉
				</span>
				<span className={styles.message}>
					<strong>JavaScript is 30!</strong> Join us in celebrating 3 decades of
					web magic. Let&apos;s make the next 30 years even more amazing! 🚀
				</span>
				<a href="/30-years-of-javascript" className={styles.cta}>
					Explore the Journey
				</a>
			</div>
			<button
				onClick={handleClose}
				className={styles.closeButton}
				aria-label="Close banner"
			>
				<FaTimes className={styles.closeIcon} />
			</button>
		</div>
	);
};

export default AnniversaryBanner;
