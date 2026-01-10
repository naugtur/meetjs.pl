import { getTranslate } from '@/tolgee/server';

export default async function OpenSourcePage() {
  const t = await getTranslate();

  return (
    <main>
      <header className="relative flex grid h-96 items-center justify-center bg-gray-900 text-center text-white md:h-[25rem]">
        <div className="z-10 mx-auto my-auto">
          <h1 className="inline-block -rotate-2 bg-blue p-2 text-6xl font-bold">
            {t('open_source.hero.title')}
          </h1>
          <h2 className="mt-4 p-4 text-xl font-medium">
            {t('open_source.hero.subtitle')}
          </h2>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="prose prose-lg dark:prose-invert max-w-none text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {t('open_source.description.title')}
            </h2>
            <p className="text-xl leading-relaxed">
              {t('open_source.description.content')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">
                {t('open_source.support.title')}
              </h3>
              <p className="mb-4">{t('open_source.support.description')}</p>
              <ul className="mb-6 list-inside list-disc space-y-2">
                <li>{t('open_source.support.ways.0')}</li>
                <li>{t('open_source.support.ways.1')}</li>
                <li>{t('open_source.support.ways.2')}</li>
              </ul>

              <h4 className="mb-3 text-xl font-bold">
                {t('open_source.support.platforms.title')}
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/sponsors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors visited:text-white hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {t('open_source.support.platforms.github')}
                </a>
                <a
                  href="https://opencollective.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {t('open_source.support.platforms.opencollective')}
                </a>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">
                {t('open_source.projects.title')}
              </h3>
              <p className="mb-4">{t('open_source.projects.description')}</p>
              <div className="mt-6 rounded-md bg-muted p-4 text-center">
                <p className="italic text-muted-foreground">
                  {t('open_source.projects.coming_soon')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
