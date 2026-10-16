#!/usr/bin/env node
// Deterministic stand-ins for the Crossweb events and speakers APIs, so the
// Next.js baseline and the Nuxt port can be compared on identical data.
//
//   node scripts/parity/fixtures-server.mjs [--port 3999]
//
//   EVENTS_API_URL=http://127.0.0.1:3999/crossweb/events          (?old=1 → past)
//   SPEAKERS_API_URL=http://127.0.0.1:3999/crossweb/speakers
//   SPEAKERS_API_TOKEN=fixture
//
// Dates are relative to today, so the data is stable for a whole day.

import { createServer } from 'node:http';
import { parseArgs } from './lib/args.mjs';

const args = parseArgs();
const port = Number(args.port ?? 3999);

const pad = (value) => String(value).padStart(2, '0');
const day = (offsetDays) => {
  const now = new Date();
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + offsetDays,
  );
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

const event = (id, offsetDays, fields) => ({
  id,
  date_add: 1_700_000_000,
  date: day(offsetDays),
  time: '18:00',
  type: 'Spotkanie',
  url: `https://crossweb.pl/wydarzenia/fixture-${id}/`,
  rsvp: `https://crossweb.pl/wydarzenia/fixture-${id}/`,
  address: null,
  image: '',
  serie: 'meet.js',
  topic: ['JavaScript'],
  ...fields,
});

const keyed = (events) =>
  Object.fromEntries(events.map((item, index) => [String(index + 1), item]));

export const upcomingEvents = () =>
  keyed([
    event(910001, 3, {
      name: 'meet.js Kraków #fixture',
      city: 'Kraków',
      address: 'Lubicz 23/a',
    }),
    event(910002, 6, {
      name: 'meet.js Wrocław x Fixture',
      city: 'Wrocław',
      address: 'Włodkowica 5',
      time: '18:30-21:00',
    }),
    event(910003, 9, {
      name: 'meet.js Trójmiasto #fixture',
      city: 'Trójmiasto',
      address: 'Aleja Grunwaldzka 472',
    }),
    event(910004, 12, {
      name: 'meet.js Bielsko-Biała #fixture',
      city: 'Bielsko Biała',
      address: 'Wzgórze 1',
    }),
    event(910005, 15, {
      name: 'meet.js Summit Fixture',
      city: 'Warszawa',
      address: 'Chmielna 69',
      type: 'Konferencja',
      time: '09:00',
    }),
    event(910006, 20, {
      name: 'meet.js Online #fixture',
      city: 'On-line',
      type: 'Webinar',
    }),
    event(910007, 25, {
      name: 'meet.js Łódź #fixture',
      city: 'Łódź',
      address: 'Piotrkowska 157/A',
      type: 'Meetup',
    }),
    event(910008, 33, {
      name: 'meet.js Kraków #fixture 2',
      city: 'Kraków',
      address: 'Lubicz 23/a',
    }),
    event(910009, 40, {
      name: 'Fixture Conference',
      city: 'Poznań',
      type: 'Conference',
      address: 'Głogowska 14',
    }),
    // Filtered out: more than six months ahead / already over.
    event(910010, 220, { name: 'meet.js Far Future', city: 'Lublin' }),
    event(910011, -2, { name: 'meet.js Recently Over', city: 'Lublin' }),
  ]);

export const pastEvents = () =>
  keyed(
    [
      ['Poznań', 'Wierzbięcice 1B'],
      ['Wrocław', 'Włodkowica 5'],
      ['Kraków', 'Lubicz 23/a'],
      ['Warszawa', 'Chmielna 69'],
      ['Białystok', 'Zwierzyniecka 10'],
      ['Trójmiasto', 'Aleja Grunwaldzka 472'],
      ['Łódź', 'Piotrkowska 157/A'],
      ['Lublin', 'Narutowicza 30'],
      ['Katowice', 'Mariacka 1'],
      ['On-line', null],
    ].map(([city, address], index) =>
      event(920001 + index, -10 - index * 9, {
        name: `meet.js ${city} #past-${index + 1}`,
        city,
        address,
      }),
    ),
  );

export const speakers = () =>
  [
    ['Anna', 'Kowalska', 12, 1],
    ['Jan', 'Nowak', 8, 2],
    ['Katarzyna', 'Wiśniewska', 7, 3],
    ['Piotr', 'Wójcik', 6, 4],
    ['Maria', 'Kamińska', 5, 5],
    ['Tomasz', 'Lewandowski', 5, 6],
    ['Agnieszka', 'Zielińska', 4, 7],
    ['Michał', 'Szymański', 4, 8],
    ['Ewa', 'Woźniak', 3, 9],
    ['Paweł', 'Dąbrowski', 3, 10],
    ['Zofia', 'Kozłowska', 2, 11],
    ['Krzysztof', null, 2, 12],
    ['Dev', '', 1, null],
    ['Ola', 'Mazur', 1, null],
  ].map(([name, surname, eventsCount, avatar], index) => ({
    id: 930001 + index,
    name,
    surname,
    slug: `fixture-speaker-${index + 1}`,
    ...(avatar
      ? { image: `https://avatars.githubusercontent.com/u/${avatar}` }
      : {}),
    events_count: eventsCount,
    url: `https://crossweb.pl/profile/fixture-speaker-${index + 1}/`,
  }));

const json = (response, status, body) => {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(body));
};

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname === '/crossweb/events') {
    return json(
      response,
      200,
      url.searchParams.get('old') === '1' ? pastEvents() : upcomingEvents(),
    );
  }
  if (url.pathname === '/crossweb/speakers') {
    return json(response, 200, speakers());
  }
  if (url.pathname === '/health') return json(response, 200, { ok: true });
  return json(response, 404, { error: 'not found' });
}).listen(port, '127.0.0.1', () => {
  console.log(`Fixtures on http://127.0.0.1:${port}`);
  console.log(`  EVENTS_API_URL=http://127.0.0.1:${port}/crossweb/events`);
  console.log(`  SPEAKERS_API_URL=http://127.0.0.1:${port}/crossweb/speakers`);
  console.log('  SPEAKERS_API_TOKEN=fixture');
});
