import { getTranslate } from '@/tolgee/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default async function TolgeeDemoPage() {
  const t = await getTranslate();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('welcome')}</h1>
          <LanguageSwitcher />
        </div>
        
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">{t('hello_world')}</h2>
            <p className="text-gray-600">
              This is a demo page to test Tolgee internationalization integration.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Navigation Translations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <strong>Home:</strong> {t('navigation.home')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Events:</strong> {t('navigation.events')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>About:</strong> {t('navigation.about')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Discounts:</strong> {t('navigation.discounts')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Team:</strong> {t('navigation.team')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Sponsors:</strong> {t('navigation.sponsors')}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Hero Section Translations</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <strong>Title:</strong> {t('hero.title')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Subtitle:</strong> {t('hero.subtitle')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>CTA:</strong> {t('hero.cta')}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Footer Translations</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <strong>Copyright:</strong> {t('footer.copyright')}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <strong>Contact:</strong> {t('footer.contact')}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
