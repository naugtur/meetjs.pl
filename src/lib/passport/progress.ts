import type {
  AttendanceRecord,
  BracketId,
  EligibleCity,
  Participant,
} from '@/types/passport';
import { computeBracketAchievements } from './achievement';
import { BRACKETS } from './brackets';

export interface BracketProgress {
  bracketId: BracketId;
  achievedAt: string | null;
  citiesNeeded: number;
}

export interface ParticipantProgress {
  participant: Participant;
  activeRecordsByCity: Record<string, AttendanceRecord[]>;
  revokedRecords: AttendanceRecord[];
  brackets: BracketProgress[];
}

export function computeParticipantProgress(
  participant: Participant,
  attendanceRecords: AttendanceRecord[],
  roster: EligibleCity[],
): ParticipantProgress {
  const participantRecords = attendanceRecords.filter(
    (record) => record.participantSlug === participant.slug,
  );

  const activeRecords = participantRecords.filter(
    (record) => record.status === 'active',
  );
  const revokedRecords = participantRecords.filter(
    (record) => record.status === 'revoked',
  );

  const activeRecordsByCity: Record<string, AttendanceRecord[]> = {};
  for (const record of activeRecords) {
    (activeRecordsByCity[record.eventCity] ??= []).push(record);
  }

  const achievements = computeBracketAchievements(activeRecords, roster);
  const achievedAtByBracket = new Map(
    achievements.map((achievement) => [
      achievement.bracketId,
      achievement.achievedAt,
    ]),
  );

  const eligibleCityNames = new Set(roster.map((city) => city.name));
  const distinctEligibleCityCount = new Set(
    activeRecords
      .map((record) => record.eventCity)
      .filter((city) => eligibleCityNames.has(city)),
  ).size;

  const now = new Date();
  const brackets: BracketProgress[] = BRACKETS.map((bracket) => {
    const achievedAt = achievedAtByBracket.get(bracket.id) ?? null;
    const citiesNeeded =
      achievedAt !== null
        ? 0
        : Math.max(
            0,
            bracket.requiredCityCount(now, roster) - distinctEligibleCityCount,
          );

    return {
      bracketId: bracket.id,
      achievedAt,
      citiesNeeded,
    };
  });

  return {
    participant,
    activeRecordsByCity,
    revokedRecords,
    brackets,
  };
}
