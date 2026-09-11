// The server middleware chain (wired via `start.middleware` in
// vite.config.ts): fetch-style functions fronting every request the server
// dispatches — page renders, server function calls, and API routes alike.
import {
  createAPIHandler,
  type FileRouteHandlers,
} from 'filesystem-routing/api';
import routes from 'virtual:file-routes';

// Social short links and aliases previously served by next.config.ts
// redirects().
const REDIRECTS: Record<string, string> = {
  '/facebook': 'https://www.facebook.com/meetjspl',
  '/instagram': 'https://www.instagram.com/meet.js_poland',
  '/instagram-bialystok': 'https://www.instagram.com/meet.js_bialystok',
  '/instagram-poznan': 'https://www.instagram.com/meet.js_poznan',
  '/instagram-wroclaw': 'https://www.instagram.com/meetjs_wroclaw',
  '/linkedin': 'https://www.linkedin.com/company/meetjs',
  '/x': 'https://x.com/meetjs',
  '/discord': 'https://discord.gg/8r9XKTeNW8',
  '/github': 'https://github.com/meetjspl',
  '/youtube': 'https://www.youtube.com/@meetjs',
  '/promos': '/discounts',
};

function redirects(request: Request, next: () => Promise<Response>) {
  const { pathname } = new URL(request.url);
  const destination = REDIRECTS[pathname];
  if (destination) {
    return Response.redirect(destination, 308);
  }
  return next();
}

// createAPIHandler serves the GET/POST/... exports of route modules
// (see src/routes/api) and passes everything else down the chain.
export default [
  redirects,
  createAPIHandler(routes as unknown as FileRouteHandlers[]),
];
