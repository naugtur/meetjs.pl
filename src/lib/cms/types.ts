export interface CityStatusChange {
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  changedAt: string;
  reason: string;
}

export interface CMSCity {
  id: string;
  name: string;
  href: string;
  status: 'active' | 'paused' | 'coming-soon' | 'new';
  coordinates: {
    lat: number;
    lng: number;
  };
  organizers: string[]; // Organizer IDs
  sponsors: string[];   // Sponsor IDs
  events: string[];     // Event IDs
  description: string;
  coverImage?: string;
  socialLinks?: string[];
  contactEmail?: string;
  lastUpdated: string;
  updatedBy: string;
  statusHistory: CityStatusChange[];
}

export interface CMSOrganizer {
  id: string;
  name: string;
  cityId: string;
  role: 'lead' | 'co-organizer' | 'volunteer';
  bio?: string;
  avatar?: string;
  socialLinks?: Record<string, string>;
  contactInfo?: Record<string, string>;
}

export interface CMSEvent {
  id: string;
  cityId: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  onlineUrl?: string;
  speakers?: string[];
  status: 'upcoming' | 'past' | 'cancelled';
  rsvpCount?: number;
  capacity?: number;
}

export interface CMSDiscount {
  id: string;
  name: string;
  message: string;
  cta: string;
  ticketLink: string;
  eventLink: string;
  expiresAt: string;
  description: string;
  gradient?: string;
  icon?: string;
  emojiRight?: string;
  country?: string;
  city?: string;
  discountCode?: string;
  image?: string;
  cityIds?: string[]; // Cities this discount applies to
}