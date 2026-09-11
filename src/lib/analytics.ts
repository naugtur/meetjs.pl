type AnalyticsClientEvent = 'click_discord_invite';

type TrackClientEvent = (
  event: AnalyticsClientEvent,
  properties?: Record<string, string | number | boolean | null>,
  options?: { flags?: Record<string, unknown> },
) => void;

// Framework-agnostic equivalent of @vercel/analytics' track(): the snippet in
// Document.tsx queues calls on window.va/vaq until the insights script loads.
export const trackClientEvent: TrackClientEvent = (event, properties) => {
  const w = window as unknown as {
    va?: (action: string, name: string, data?: unknown) => void;
  };
  w.va?.('event', event, { data: properties });
};
