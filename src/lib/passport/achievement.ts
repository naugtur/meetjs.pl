import type {
  AttendanceRecord,
  BracketId,
  EligibleCity,
} from '@/types/passport';
import { BRACKETS } from './brackets';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const QUALIFYING_SPAN_DAYS = 365;

export interface BracketAchievement {
  bracketId: BracketId;
  achievedAt: string;
}

function parseEventDate(dateStr: string): Date {
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

export function computeBracketAchievements(
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
      eligible.push({ record, date: parseEventDate(record.eventDate) });
    } catch {
      continue;
    }
  }

  if (eligible.length === 0) {
    return [];
  }

  eligible.sort((a, b) => a.date.getTime() - b.date.getTime());

  const achievements: BracketAchievement[] = [];

  for (const bracket of BRACKETS) {
    let achievedAt: Date | null = null;
    let windowStart = 0;
    const cityCounts = new Map<string, number>();

    for (let i = 0; i < eligible.length; i++) {
      const candidate = eligible[i];
      cityCounts.set(
        candidate.record.eventCity,
        (cityCounts.get(candidate.record.eventCity) ?? 0) + 1,
      );

      const windowStartCutoff =
        candidate.date.getTime() - QUALIFYING_SPAN_DAYS * MS_PER_DAY;
      while (eligible[windowStart].date.getTime() < windowStartCutoff) {
        const expired = eligible[windowStart];
        const count = cityCounts.get(expired.record.eventCity) ?? 0;
        if (count <= 1) {
          cityCounts.delete(expired.record.eventCity);
        } else {
          cityCounts.set(expired.record.eventCity, count - 1);
        }
        windowStart++;
      }

      const requiredCount = bracket.requiredCityCount(candidate.date, roster);
      if (cityCounts.size >= requiredCount) {
        achievedAt = candidate.date;
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
