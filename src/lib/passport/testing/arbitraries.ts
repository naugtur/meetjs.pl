import fc from 'fast-check';
import type {
  AttendanceRecord,
  AttendanceStatus,
  EligibleCity,
} from '@/types/passport';

export const ELIGIBLE_CITY_NAMES = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Katowice',
  'Łódź',
  'Rzeszów',
  'Szczecin',
  'Lublin',
] as const;

const NAME_LETTERS =
  'aąbcćdeęfghijklłmnńoóprsśtuwyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ';

const NAME_SEPARATORS = [' ', '-', '.', "'", '’'];

const nameWordArbitrary: fc.Arbitrary<string> = fc.string({
  unit: fc.constantFrom(...NAME_LETTERS),
  minLength: 1,
  maxLength: 12,
});

const wellFormedDisplayNameArbitrary: fc.Arbitrary<string> = fc
  .array(nameWordArbitrary, { minLength: 1, maxLength: 4 })
  .chain((words) =>
    fc
      .array(fc.constantFrom(...NAME_SEPARATORS), {
        minLength: words.length - 1,
        maxLength: words.length - 1,
      })
      .map((separators) =>
        words.reduce(
          (name, word, i) =>
            i === 0 ? word : `${name}${separators[i - 1]}${word}`,
          '',
        ),
      ),
  );

const whitespaceOnlyDisplayNameArbitrary: fc.Arbitrary<string> = fc.oneof(
  fc.constant(''),
  fc.string({
    unit: fc.constantFrom(' ', '\t', '\n'),
    minLength: 1,
    maxLength: 5,
  }),
);

export const displayNameArbitrary: fc.Arbitrary<string> = fc.oneof(
  { weight: 4, arbitrary: wellFormedDisplayNameArbitrary },
  { weight: 1, arbitrary: whitespaceOnlyDisplayNameArbitrary },
);

export const isoDateStringArbitrary: fc.Arbitrary<string> = fc
  .date({
    min: new Date('2010-01-01T00:00:00.000Z'),
    max: new Date('2035-12-31T00:00:00.000Z'),
    noInvalidDate: true,
  })
  .map((date) => date.toISOString().slice(0, 10));

export const eligibleCityArbitrary: fc.Arbitrary<EligibleCity> = fc.record({
  name: fc.constantFrom(...ELIGIBLE_CITY_NAMES),
  addedAt: isoDateStringArbitrary,
});

export const eventDateArbitrary: fc.Arbitrary<string> = fc
  .date({
    min: new Date('2010-01-01T00:00:00.000Z'),
    max: new Date('2035-12-31T00:00:00.000Z'),
    noInvalidDate: true,
  })
  .map((date) => {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  });

export const attendanceStatusArbitrary: fc.Arbitrary<AttendanceStatus> =
  fc.constantFrom('active', 'revoked');

const slugLikeArbitrary: fc.Arbitrary<string> = fc
  .array(
    fc.string({
      unit: fc.constantFrom(
        ...'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
      ),
      minLength: 1,
      maxLength: 8,
    }),
    { minLength: 1, maxLength: 3 },
  )
  .map((parts) => parts.join('-'));

export const attendanceRecordArbitrary: fc.Arbitrary<AttendanceRecord> = fc
  .record({
    participantSlug: slugLikeArbitrary,
    eventId: fc.integer({ min: 1, max: 1_000_000 }),
    eventDate: eventDateArbitrary,
    eventCity: fc.constantFrom(...ELIGIBLE_CITY_NAMES),
    eventName: fc.string({ minLength: 1, maxLength: 40 }),
    status: attendanceStatusArbitrary,
  })
  .chain((partial) =>
    partial.status === 'revoked'
      ? fc
          .string({ minLength: 1, maxLength: 40 })
          .map((revokedReason) => ({ ...partial, revokedReason }))
      : fc.constant(partial),
  );
