import { z } from 'zod';

export const EligibleCitySchema = z.object({
  name: z.string().min(1),
  addedAt: z.string().date(),
});
export type EligibleCity = z.infer<typeof EligibleCitySchema>;

export const ParticipantSchema = z.object({
  slug: z.string().min(1),
  displayName: z.string().min(1),
  image: z.string().url().optional(),
  profileUrl: z.string().url().optional(),
});
export type Participant = z.infer<typeof ParticipantSchema>;

export const AttendanceStatusSchema = z.enum(['active', 'revoked']);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

export const AttendanceRecordSchema = z
  .object({
    participantSlug: z.string().min(1),
    eventId: z.number(),
    eventDate: z.string(),
    eventCity: z.string().min(1),
    eventName: z.string().min(1),
    status: AttendanceStatusSchema,
    revokedReason: z.string().min(1).optional(),
  })
  .refine((r) => r.status !== 'revoked' || !!r.revokedReason, {
    message: 'revokedReason is required when status is "revoked"',
    path: ['revokedReason'],
  });
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;

export const BracketIdSchema = z.enum([
  'two_city',
  'four_city',
  'six_city',
  'all_city',
]);
export type BracketId = z.infer<typeof BracketIdSchema>;
