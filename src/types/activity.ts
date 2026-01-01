export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  resourceType: 'city' | 'discount' | 'event' | 'user' | 'settings';
  resourceId: string;
  resourceName?: string;
  changes?: {
    field: string;
    oldValue?: any;
    newValue?: any;
  }[];
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export type ActivityLogFilter = {
  resourceType?: ActivityLog['resourceType'];
  userId?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
};