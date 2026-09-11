// Server-function reads shared across routes: on the server these run
// in-process; in the browser they are typed fetches against /_server.
// query() caches each read per key so a preload and the page share one call.
import { query } from '@solidjs/router';
import { env } from 'virtual:env/server';

import { fetchPastEvents, fetchUpcomingEvents } from '../server/events';
import { fetchSpeakers } from '../server/speakers';
import { fetchDiscordServerData } from '../server/discord';

export const getUpcomingEvents = query(async () => {
  'use server';
  return fetchUpcomingEvents(env.EVENTS_API_URL);
}, 'upcoming-events');

export const getSpeakers = query(async () => {
  'use server';
  return fetchSpeakers(env.SPEAKERS_API_URL, env.SPEAKERS_API_TOKEN);
}, 'speakers');

export const getDiscordServerData = query(async () => {
  'use server';
  return fetchDiscordServerData(env.DISCORD_SERVER_ID);
}, 'discord-server');

export const getPastEvents = query(async () => {
  'use server';
  return fetchPastEvents(env.EVENTS_API_URL);
}, 'past-events');
