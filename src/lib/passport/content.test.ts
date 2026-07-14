import { describe, expect, it } from 'vitest';

import {
  validateAttendanceRecords,
  validateParticipants,
} from '@/lib/passport/validation';
import { ATTENDANCE_RECORDS } from '@/content/passport/attendanceRecords';
import { PARTICIPANTS } from '@/content/passport/participants';

describe('Passport content validation gate', () => {
  it('validates PARTICIPANTS with zero errors', () => {
    const errors = validateParticipants(PARTICIPANTS);

    expect(errors).toEqual([]);
  });

  it('validates ATTENDANCE_RECORDS with zero errors', () => {
    const errors = validateAttendanceRecords(ATTENDANCE_RECORDS, PARTICIPANTS);

    expect(errors).toEqual([]);
  });
});
