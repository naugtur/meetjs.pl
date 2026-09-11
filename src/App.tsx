import { Title } from '@solidjs/meta';
import { Loading } from 'solid-js';
import { paths, Router } from './router';
import { I18nProvider } from './i18n';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SchemaMarkup } from './components/SchemaMarkup';
import { PromoBanners } from './components/PromoBanners';
import { softwareDiscounts } from './content/software-discounts';
import { eventsDiscounts } from './content/events-discounts';
import { learningDiscounts } from './content/learning-discounts';
import './App.css';

// The app root: the router and the site-wide layout live here. Pages are
// the modules under src/routes.
export default function App() {
  return (
    <I18nProvider>
      <Router>
        {(props) => (
          <>
            <Title>meet.js - JavaScript Meetups in Poland</Title>
            <PromoBanners
              promos={[
                ...eventsDiscounts,
                ...softwareDiscounts,
                ...learningDiscounts,
              ]}
            />
            <Navigation />
            <Loading fallback={<main aria-busy="true" />}>
              {props.children}
            </Loading>
            <Footer />
            <SchemaMarkup />
          </>
        )}
      </Router>
    </I18nProvider>
  );
}

// Referenced by typed-paths imports across the app.
export { paths };
