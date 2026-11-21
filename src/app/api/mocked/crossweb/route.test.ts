import { describe, it, expect, vi, afterEach } from 'vitest';
import { GET } from '@/app/api/mocked/crossweb/route';
import { EventsSchema } from '@/types/event';

describe('GET /api/mocked/crossweb', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns valid upcoming mock events in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const response = await GET(
      new Request('http://localhost:3000/api/mocked/crossweb'),
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    const parsed = EventsSchema.parse(json);
    expect(Object.keys(parsed ?? {}).length).toBeGreaterThan(0);
  });

  it('returns valid past mock events when ?old=1 in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const response = await GET(
      new Request('http://localhost:3000/api/mocked/crossweb?old=1'),
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    const parsed = EventsSchema.parse(json);
    expect(Object.keys(parsed ?? {}).length).toBeGreaterThan(0);
  });

  it('returns 404 in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const response = await GET(
      new Request('https://meetjs.pl/api/mocked/crossweb'),
    );

    expect(response.status).toBe(404);
  });
});
