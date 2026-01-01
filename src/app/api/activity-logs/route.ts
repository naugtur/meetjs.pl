import { NextResponse } from 'next/server';
import { getActivityLogs, getRecentActivityLogs } from '@/lib/activity-logger';
import { ActivityLogFilter } from '@/types/activity';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  try {
    // Get filter parameters
    const resourceType = searchParams.get('resourceType') as any;
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const limit = searchParams.get('limit');

    let logs;
    if (limit && !resourceType && !userId && !action) {
      // Get recent logs if only limit is specified
      const limitNum = parseInt(limit) || 20;
      logs = await getRecentActivityLogs(limitNum);
    } else {
      // Get filtered logs
      const filter: ActivityLogFilter = {};
      if (resourceType) filter.resourceType = resourceType as any;
      if (userId) filter.userId = userId;
      if (action) filter.action = action;
      if (searchParams.get('startDate')) {
        filter.startDate = new Date(searchParams.get('startDate')!);
      }
      if (searchParams.get('endDate')) {
        filter.endDate = new Date(searchParams.get('endDate')!);
      }
      logs = await getActivityLogs(filter);
    }

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}