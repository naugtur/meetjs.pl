import Image from 'next/image';
import { Trophy, Award, Compass, MapPin, Rocket } from 'lucide-react';
import type { BracketId, Participant } from '@/types/passport';

export const BRACKET_STYLES: Record<
  BracketId,
  {
    icon: typeof Trophy;
    avatarGradient: string;
    badgeClass: string;
    cardHighlightClass: string;
  }
> = {
  two_city: {
    icon: MapPin,
    avatarGradient: 'from-emerald-400 to-emerald-600',
    badgeClass: 'border-emerald-300 bg-emerald-100 text-emerald-700',
    cardHighlightClass: 'border-emerald-300 bg-emerald-50',
  },
  four_city: {
    icon: Compass,
    avatarGradient: 'from-blue-400 to-blue-600',
    badgeClass: 'border-blue-300 bg-blue-100 text-blue-700',
    cardHighlightClass: 'border-blue-300 bg-blue-50',
  },
  six_city: {
    icon: Award,
    avatarGradient: 'from-purple-400 to-purple-600',
    badgeClass: 'border-purple-300 bg-purple-100 text-purple-700',
    cardHighlightClass: 'border-purple-300 bg-purple-50',
  },
  all_city: {
    icon: Trophy,
    avatarGradient: 'from-yellow-400 to-amber-600',
    badgeClass: 'border-yellow-300 bg-yellow-100 text-yellow-700',
    cardHighlightClass: 'border-yellow-300 bg-yellow-50',
  },
};

export const STARTING_OUT_STYLE = {
  icon: Rocket,
  avatarGradient: 'from-gray-300 to-gray-500',
  badgeClass: 'border-gray-300 bg-gray-100 text-gray-600',
  cardHighlightClass: 'border-gray-200 bg-gray-50',
};

export const getInitials = (displayName: string): string => {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? '';
  const last =
    parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return (first + last).toUpperCase();
};

export const formatAchievedAt = (isoDate: string, language: string): string => {
  const locale = language === 'pl' ? 'pl-PL' : 'en-US';
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface ParticipantAvatarProps {
  participant: Participant;
  gradient: string;
  size: number;
  className?: string;
}

export const ParticipantAvatar = ({
  participant,
  gradient,
  size,
  className = '',
}: ParticipantAvatarProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gray-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {participant.image ? (
        <Image
          src={participant.image}
          alt={participant.displayName}
          fill
          sizes={`${size}px`}
          className="scale-110 rounded-full object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ${gradient}`}
          style={{ fontSize: size / 2.8 }}
        >
          {getInitials(participant.displayName)}
        </div>
      )}
    </div>
  );
};
