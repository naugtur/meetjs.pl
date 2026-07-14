import type { AttendanceRecord, EligibleCity } from '@/types/passport';
import type { BracketAchievement } from '@/lib/passport/achievement';
import { BRACKETS } from '@/lib/passport/brackets';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const QUALIFYING_SPAN_DAYS = 365;

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);

  if (!day || !month || !year || day > 31 || month > 12) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return new Date(year, month - 1, day);
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function distinctCityCount(
  records: { record: AttendanceRecord; date: Date }[],
): number {
  return new Set(records.map((r) => r.record.eventCity)).size;
}

function qualifyingSubsetExists(
  windowRecords: { record: AttendanceRecord; date: Date }[],
  candidateDate: Date,
  requiredCount: number,
): boolean {
  const n = windowRecords.length;
  const candidateTime = candidateDate.getTime();

  for (let mask = 1; mask < 1 << n; mask++) {
    const subset: { record: AttendanceRecord; date: Date }[] = [];
    let containsCandidateDate = false;

    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        const item = windowRecords[i];
        subset.push(item);
        if (item.date.getTime() === candidateTime) {
          containsCandidateDate = true;
        }
      }
    }

    if (!containsCandidateDate) {
      continue;
    }

    if (distinctCityCount(subset) >= requiredCount) {
      return true;
    }
  }

  return false;
}

export function bruteForceComputeBracketAchievements(
  activeRecords: AttendanceRecord[],
  roster: EligibleCity[],
): BracketAchievement[] {
  const eligibleCityNames = new Set(roster.map((city) => city.name));

  const eligible: { record: AttendanceRecord; date: Date }[] = [];
  for (const record of activeRecords) {
    if (!eligibleCityNames.has(record.eventCity)) {
      continue;
    }
    try {
      eligible.push({ record, date: parseDate(record.eventDate) });
    } catch {
      continue;
    }
  }

  if (eligible.length === 0) {
    return [];
  }

  const sortedByDate = [...eligible].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  const candidateDates: Date[] = [];
  for (const item of sortedByDate) {
    const last = candidateDates[candidateDates.length - 1];
    if (!last || last.getTime() !== item.date.getTime()) {
      candidateDates.push(item.date);
    }
  }

  const achievements: BracketAchievement[] = [];

  for (const bracket of BRACKETS) {
    let achievedAt: Date | null = null;

    for (const candidateDate of candidateDates) {
      const windowStart =
        candidateDate.getTime() - QUALIFYING_SPAN_DAYS * MS_PER_DAY;
      const windowRecords = eligible.filter(
        (item) =>
          item.date.getTime() >= windowStart &&
          item.date.getTime() <= candidateDate.getTime(),
      );

      const requiredCount = bracket.requiredCityCount(candidateDate, roster);

      if (qualifyingSubsetExists(windowRecords, candidateDate, requiredCount)) {
        achievedAt = candidateDate;
        break;
      }
    }

    if (achievedAt) {
      achievements.push({
        bracketId: bracket.id,
        achievedAt: toIsoDate(achievedAt),
      });
    }
  }

  return achievements;
}
