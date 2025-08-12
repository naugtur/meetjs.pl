import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getTranslate } from '@/tolgee/server';

export const AboutSection = async () => {
  const t = await getTranslate();
  return (
    <section
      className="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col items-center justify-between p-12 px-2 md:flex-row lg:px-8"
      id="about"
    >
      <div className="w-full md:w-1/2">
        <Image
          src="/conference.jpg"
          alt="meet.js conference"
          width={2000}
          height={1333}
          priority={false}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full p-8 md:w-1/2 md:p-12">
        <h2 className="mb-6 text-3xl font-bold">{t('about.title')}</h2>
        <div className="flex flex-col gap-4">
          <p>
            {t('about.description')}
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>{t('about.features.non_commercial')}</li>
            <li>{t('about.features.regular_meetups')}</li>
            <li>{t('about.features.summit')}</li>
          </ul>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/about"
              className={buttonVariants({
                className:
                  'w-fit bg-purple px-8 py-4 text-center text-black hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80',
              })}
            >
              {t('about.learn_more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
