import type {
  AttendanceRecord,
  BracketId,
  EligibleCity,
  Participant,
} from '@/types/passport';
import { BRACKETS } from './brackets';
import { computeBracketAchievements } from './achievement';

export interface HallOfFameEntry {
  participant: Participant;
  achievedAt: string;
}

export function computeHallOfFame(
  participants: Participant[],
  attendanceRecords: AttendanceRecord[],
  roster: EligibleCity[],
): Record<BracketId, HallOfFameEntry[]> {
  const hallOfFame: Record<BracketId, HallOfFameEntry[]> = {
    two_city: [],
    four_city: [],
    six_city: [],
    all_city: [],
  };

  for (const participant of participants) {
    const activeRecords = attendanceRecords.filter(
      (record) =>
        record.participantSlug === participant.slug &&
        record.status === 'active',
    );

    const achievements = computeBracketAchievements(activeRecords, roster);

    for (const achievement of achievements) {
      hallOfFame[achievement.bracketId].push({
        participant,
        achievedAt: achievement.achievedAt,
      });
    }
  }

  for (const bracket of BRACKETS) {
    hallOfFame[bracket.id].sort((a, b) =>
      a.achievedAt < b.achievedAt ? -1 : a.achievedAt > b.achievedAt ? 1 : 0,
    );
  }

  return hallOfFame;
}
