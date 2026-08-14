import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MOCK_SPEAKERS } from '@/utils/speakersMock';
import type { SpeakerType } from '@/types/speaker';

const createFetchResponse = (overrides: Partial<Response> = {}): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(''),
    ...overrides,
  }) as Response;

const mockEnv = (token: string): { env: Record<string, string> } => ({
  env: {
    SPEAKERS_API_URL: 'https://api.example.com/speakers',
    SPEAKERS_API_TOKEN: token,
  },
});

describe('getSpeakers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NODE_ENV', 'development');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns parsed API data on success', async () => {
    const apiSpeaker: SpeakerType = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      slug: 'john-doe',
      image: 'https://example.com/john.jpg',
      events_count: 5,
      url: 'https://example.com',
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          json: () => Promise.resolve([apiSpeaker]),
        }),
      ),
    );

    vi.doMock('@/env', () => mockEnv('real-token'));

    const { getSpeakers } = await import('@/utils/getSpeakers');
    const result = await getSpeakers();

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('John');
  });

  it('returns mock speakers when token is placeholder in development', async () => {
    vi.doMock('@/env', () => mockEnv('<your_token>'));
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { getSpeakers } = await import('@/utils/getSpeakers');
    const result = await getSpeakers();

    expect(result).toEqual(MOCK_SPEAKERS);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('returning mock data for development'),
    );
  });

  it('returns empty array when token is placeholder in production', async () => {
    vi.unstubAllEnvs();
    vi.stubEnv('NODE_ENV', 'production');
    vi.doMock('@/env', () => mockEnv('<your_token>'));

    const { getSpeakers } = await import('@/utils/getSpeakers');
    const result = await getSpeakers();

    expect(result).toEqual([]);
  });

  it('returns mock speakers on HTML (Cloudflare) response in development', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          ok: false,
          status: 403,
          statusText: 'Forbidden',
          text: () => Promise.resolve('<!DOCTYPE html><html>...</html>'),
        }),
      ),
    );

    vi.doMock('@/env', () => mockEnv('real-token'));

    const { getSpeakers } = await import('@/utils/getSpeakers');
    const result = await getSpeakers();

    expect(result).toEqual(MOCK_SPEAKERS);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Cloudflare/WAF'),
    );
  });

  it('returns empty array on API error in production', async () => {
    vi.unstubAllEnvs();
    vi.stubEnv('NODE_ENV', 'production');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve(
        createFetchResponse({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          text: () => Promise.resolve('server error'),
        }),
      ),
    );

    vi.doMock('@/env', () => mockEnv('real-token'));

    const { getSpeakers } = await import('@/utils/getSpeakers');
    const result = await getSpeakers();

    expect(result).toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
  });
});
