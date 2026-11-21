import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const createFetchResponse = (overrides: Partial<Response> = {}): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({}),
    ...overrides,
  }) as Response;

describe('getDiscordServerData', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock('@/env', () => ({
      env: {
        DISCORD_SERVER_ID: '735954756169760768',
      },
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns validated server data and passes AbortSignal', async () => {
    const fetchSpy = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          json: () =>
            Promise.resolve({
              id: '735954756169760768',
              name: 'meet.js Poland',
              instant_invite: 'https://discord.com/invite/abc',
              presence_count: 54,
            }),
        }),
      ),
    );
    global.fetch = fetchSpy;

    const { getDiscordServerData } = await import('@/lib/discord');
    const result = await getDiscordServerData();

    expect(result).toEqual({
      id: '735954756169760768',
      name: 'meet.js Poland',
      member_count: 54,
      invite_url: 'https://discord.com/invite/abc',
    });
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://discord.com/api/guilds/735954756169760768/widget.json',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
        next: { revalidate: 3_600 },
      }),
    );
  });

  it('handles nullable instant_invite gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          json: () =>
            Promise.resolve({
              id: '735954756169760768',
              name: 'meet.js Poland',
              instant_invite: null,
              presence_count: 12,
            }),
        }),
      ),
    );

    const { getDiscordServerData } = await import('@/lib/discord');
    const result = await getDiscordServerData();

    expect(result?.invite_url).toBeNull();
    expect(result?.member_count).toBe(12);
  });

  it('returns null on invalid payload schema', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          json: () => Promise.resolve({ unexpected: true }),
        }),
      ),
    );

    const { getDiscordServerData } = await import('@/lib/discord');
    expect(await getDiscordServerData()).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('returns null on non-OK HTTP response', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          ok: false,
          status: 503,
        }),
      ),
    );

    const { getDiscordServerData } = await import('@/lib/discord');
    expect(await getDiscordServerData()).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });
});
