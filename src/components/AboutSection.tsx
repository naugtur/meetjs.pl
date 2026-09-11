import { buttonVariants } from '@/components/ui/button';
import { useTranslate } from '@/i18n';

export const AboutSection = () => {
  const { t } = useTranslate();
  return (
    <section
      class="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col items-center justify-between p-12 px-2 md:flex-row lg:px-8"
      id="about"
    >
      <div class="w-full md:w-1/2">
        <img
          src="/conference.jpg"
          alt="meet.js conference"
          width={2000}
          height={1333}
          loading="lazy"
          class="rounded-lg shadow-lg"
        />
      </div>
      <div class="w-full p-8 md:w-1/2 md:p-12">
        <h2 class="mb-6 text-3xl font-bold">{t('about.title')}</h2>
        <div class="flex flex-col gap-4">
          <p>{t('about.description')}</p>
          <ul class="mb-6 list-disc space-y-2 pl-6">
            <li>{t('about.features.non_commercial')}</li>
            <li>{t('about.features.regular_meetups')}</li>
            <li>{t('about.features.summit')}</li>
          </ul>
          <div class="flex justify-center md:justify-start">
            <a
              href="/about"
              class={buttonVariants({
                class:
                  'w-fit bg-purple px-8 py-4 text-center text-black hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80',
              })}
            >
              {t('about.learn_more')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
