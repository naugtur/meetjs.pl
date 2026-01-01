import { ActivityLog, ActivityLogFilter } from '@/types/activity';
import fs from 'fs/promises';
import path from 'path';

const ACTIVITY_LOG_DIR = path.join(process.cwd(), 'src/cms/activity-logs');

export async function logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
  const log: ActivityLog = {
    id: generateId(),
    timestamp: new Date(),
    ...activity
  };

  try {
    // Ensure directory exists
    await fs.mkdir(ACTIVITY_LOG_DIR, { recursive: true });

    // Save to file (one file per day for easy management)
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(ACTIVITY_LOG_DIR, `${dateStr}.json`);

    let existingLogs: ActivityLog[] = [];
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      existingLogs = JSON.parse(content);
    } catch (error) {
      // File doesn't exist yet, which is fine
    }

    existingLogs.push(log);
    await fs.writeFile(filePath, JSON.stringify(existingLogs, null, 2), 'utf-8');

    return log;
  } catch (error) {
    console.error('Failed to log activity:', error);
    throw new Error('Failed to log activity');
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

export async function getActivityLogs(filter?: ActivityLogFilter): Promise<ActivityLog[]> {
  try {
    const files = await fs.readdir(ACTIVITY_LOG_DIR);
    const allLogs: ActivityLog[] = [];

    // Read all log files
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(path.join(ACTIVITY_LOG_DIR, file), 'utf-8');
        const logs = JSON.parse(content);
        allLogs.push(...logs);
      }
    }

    // Apply filters if provided
    let filteredLogs = allLogs;
    if (filter) {
      if (filter.resourceType) {
        filteredLogs = filteredLogs.filter(log => log.resourceType === filter.resourceType);
      }
      if (filter.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filter.userId);
      }
      if (filter.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filter.action);
      }
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= filter.startDate!);
      }
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= filter.endDate!);
      }
    }

    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return filteredLogs;
  } catch (error) {
    console.error('Error reading activity logs:', error);
    return [];
  }
}

export async function getRecentActivityLogs(limit: number = 20): Promise<ActivityLog[]> {
  const allLogs = await getActivityLogs();
  return allLogs.slice(0, limit);
}