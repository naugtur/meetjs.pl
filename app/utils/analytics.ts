import { track } from '@vercel/analytics';

type AnalyticsClientEvent = 'click_discord_invite';

type TrackClientEvent = (
  event: AnalyticsClientEvent,
  properties?: Parameters<typeof track>[1],
  options?: Parameters<typeof track>[2],
) => void;

/** Vercel Analytics custom events (former src/lib/analytics.ts). */
export const trackClientEvent: TrackClientEvent = (...args) => track(...args);
