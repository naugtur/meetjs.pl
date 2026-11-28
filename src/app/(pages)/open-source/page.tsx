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
                  rel="noopener"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors visited:text-white hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {t('open_source.support.platforms.github')}
                </a>
                <a
                  href="https://opencollective.com/"
                  target="_blank"
                  rel="noopener"
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
              <div className="mt-4 space-y-3">
                <a
                  href="https://e2e.com/?utm_source=meetjs&utm_medium=community_partner&utm_campaign=e2e"
                  target="_blank"
                  rel="noopener"
                  className="block rounded-lg border bg-background p-4 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      e2e (formerly TesterArmy)
                    </span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                      TypeScript
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t('open_source.projects.e2e_description')}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
