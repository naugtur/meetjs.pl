import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';
import { getRequestLanguage } from './i18n';

// The document shell — the new index.html: picked up by the src/Document.*
// convention, it wraps the app in the plugin's generated entries and must
// render the full <html>. Head tags go here.
export default function Document(props: ParentProps) {
  return (
    <html lang={getRequestLanguage()} class="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="format-detection"
          content="email=no,address=no,telephone=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <title>meet.js - JavaScript Meetups in Poland</title>
        {/* Vercel Analytics + Speed Insights (framework-agnostic snippets) */}
        <script>{`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}</script>
        <script defer src="/_vercel/insights/script.js" />
        <script>{`window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`}</script>
        <script defer src="/_vercel/speed-insights/script.js" />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
