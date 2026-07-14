import { generateSlug } from '@/lib/passport/slug';
import type { AttendanceRecord, Participant } from '@/types/passport';

export interface ValidationError {
  message: string;
  entries: unknown[];
}

export function validateParticipants(
  participants: Participant[],
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const participant of participants) {
    if (participant.displayName.trim().length === 0) {
      errors.push({
        message: 'Participant is missing a non-empty display name',
        entries: [participant],
      });
    }
  }

  const slugGroups = new Map<string, Participant[]>();
  for (const participant of participants) {
    const slug = participant.slug.trim().length
      ? participant.slug
      : generateSlug(participant.displayName);
    const group = slugGroups.get(slug);
    if (group) {
      group.push(participant);
    } else {
      slugGroups.set(slug, [participant]);
    }
  }

  for (const [slug, group] of slugGroups) {
    if (group.length > 1) {
      errors.push({
        message: `Duplicate Participant slug "${slug}" is shared by ${group.length} entries`,
        entries: group,
      });
    }
  }

  return errors;
}

export function validateAttendanceRecords(
  records: AttendanceRecord[],
  participants: Participant[],
): ValidationError[] {
  const errors: ValidationError[] = [];

  const knownSlugs = new Set(participants.map((p) => p.slug));
  for (const record of records) {
    if (!knownSlugs.has(record.participantSlug)) {
      errors.push({
        message: `AttendanceRecord references unknown participantSlug "${record.participantSlug}"`,
        entries: [record],
      });
    }
  }

  const pairGroups = new Map<string, AttendanceRecord[]>();
  for (const record of records) {
    const key = `${record.participantSlug}::${record.eventId}`;
    const group = pairGroups.get(key);
    if (group) {
      group.push(record);
    } else {
      pairGroups.set(key, [record]);
    }
  }

  for (const [, group] of pairGroups) {
    if (group.length > 1) {
      const { participantSlug, eventId } = group[0];
      errors.push({
        message: `Duplicate AttendanceRecord for participantSlug "${participantSlug}" and eventId ${eventId} is shared by ${group.length} entries`,
        entries: group,
      });
    }
  }

  for (const record of records) {
    if (
      record.status === 'revoked' &&
      (!record.revokedReason || record.revokedReason.trim().length === 0)
    ) {
      errors.push({
        message: `AttendanceRecord with status "revoked" is missing a non-empty revokedReason`,
        entries: [record],
      });
    }
  }

  return errors;
}
