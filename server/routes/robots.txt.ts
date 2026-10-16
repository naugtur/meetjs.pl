// Same rules as the former src/app/robots.ts. An llms.txt file for LLMs is
// served from public/ (https://meetjs.pl/llms.txt).
const ALLOWED_USER_AGENTS = [
  '*',
  // OpenAI's crawler
  'GPTBot',
  // Anthropic's crawler
  'Anthropic-AI',
  // Common Crawl's bot
  'CCBot',
  // Google's extended crawler
  'Google-Extended',
  // Microsoft's crawler
  'Bingbot',
];

export default defineEventHandler((event) => {
  const { SITE_URL } = useServerEnv();
  const rules = ALLOWED_USER_AGENTS.map(
    (userAgent) => `User-Agent: ${userAgent}\nAllow: /\n`,
  ).join('\n');

  setHeader(event, 'content-type', 'text/plain; charset=utf-8');
  return `${rules}\nHost: ${SITE_URL}\nSitemap: ${SITE_URL}/sitemap.xml\n`;
});
