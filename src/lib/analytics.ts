import { track } from '@vercel/analytics';

type AnalyticsClientEvent =
  | 'click_discord_invite'
  | 'click_organizer_entry'
  | 'click_organizer_contact';

type TrackClientEvent = (
  event: AnalyticsClientEvent,
  properties?: Parameters<typeof track>[1],
  options?: Parameters<typeof track>[2],
) => void;

export const trackClientEvent: TrackClientEvent = (...args) => track(...args);
