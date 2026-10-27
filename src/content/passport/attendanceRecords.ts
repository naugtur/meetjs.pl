import type { AttendanceRecord } from '../../types/passport';
import type { ParticipantSlug } from './participants';
import type { EligibleCityName } from './eligibleCities';

const nextId = (() => {
  let id = 900_000;
  return () => ++id;
})();

type AttendedEvent = Pick<
  AttendanceRecord,
  'eventId' | 'eventName' | 'eventCity' | 'eventDate'
>;

const event = (
  eventName: string,
  eventCity: EligibleCityName,
  eventDate: string,
  eventId?: number,
): AttendedEvent => ({
  eventId: eventId ?? nextId(),
  eventName,
  eventCity,
  eventDate,
});

const attended = (
  participantSlug: ParticipantSlug,
  ...events: AttendedEvent[]
): AttendanceRecord[] =>
  events.map((e) => ({ ...e, participantSlug, status: 'active' }));

const records = {
  'adrian-romanski': attended(
    'adrian-romanski',
    event('meet.js Warsaw x Legends', 'Warszawa', '24.09.2025'),
    event('meet.js Wrocław 2025-09-25', 'Wrocław', '25.09.2025'),
    event('TypeScript Meetup #16 with meet.js', 'Gdańsk', '02.10.2025'),
    event('meet.js #Poznań #10.2025 #61', 'Poznań', '14.10.2025'),
    event('meet.js KRK [with Schibsted & Vend]', 'Kraków', '30.10.2025'),
    event('meet.js Katowice #47', 'Katowice', '26.11.2025'),
    event('meet.js Lublin #15', 'Lublin', '19.02.2026'),
    event('meet.js Łódź 03/2026', 'Łódź', '18.03.2026'),
    event('#64 meet.js Białystok', 'Białystok', '28.05.2026'),
    event('meet.js Bielsko-Biała #24', 'Bielsko-Biała', '23.06.2026'),
  ),
  'jakub-wasik': attended(
    'jakub-wasik',
    event('meet.js Wrocław 2026-10-15', 'Wrocław', '15.10.2026'),
    event('meet.js Łódź 10/2026', 'Łódź', '22.10.2026'),
  ),
  'michal-hadrysiak': [],
} as const satisfies Record<ParticipantSlug, AttendanceRecord[]>;

export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  ...records['adrian-romanski'],
  ...records['jakub-wasik'],
];

export default ATTENDANCE_RECORDS;
