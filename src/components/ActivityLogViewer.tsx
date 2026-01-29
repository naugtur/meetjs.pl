'use client';

import { useState, useEffect } from 'react';
import { ActivityLog } from '@/types/activity';
import { format } from 'date-fns';

export function ActivityLogViewer() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'cities' | 'discounts' | 'events'>('all');

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const response = await fetch(`/api/activity-logs?limit=50`);
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Failed to load activity logs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter(log => {
        if (filter === 'events') return log.resourceType === 'event';
        if (filter === 'cities') return log.resourceType === 'city';
        if (filter === 'discounts') return log.resourceType === 'discount';
        return false;
      });

  return (
    <div className="activity-log-viewer bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All Activities</option>
          <option value="cities">City Changes</option>
          <option value="discounts">Discount Changes</option>
          <option value="events">Event Changes</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading activity logs...</p>
      ) : filteredLogs.length === 0 ? (
        <p className="text-gray-500">No activity logs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Changes</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                    <div className="text-xs text-gray-500">{log.userEmail}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.resourceName || log.resourceId}</div>
                    <div className="text-xs text-gray-500 capitalize">{log.resourceType}</div>
                  </td>
                  <td className="px-3 py-3 text-sm">
                    {log.changes ? (
                      <div className="space-y-1">
                        {log.changes.map((change, i) => (
                          <div key={i} className="flex items-start">
                            <span className="font-medium mr-1">{change.field}:</span>
                            {change.oldValue && (
                              <span className="line-through text-gray-500 text-xs mr-1"> {change.oldValue}</span>
                            )}
                            {change.newValue && (
                              <span className="font-medium text-green-600 text-xs"> {change.newValue}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No details</span>
                    )}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}