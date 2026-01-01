'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllCities } from '@/lib/cms/city';
import { ActivityLogViewer } from '@/components/ActivityLogViewer';

export default function AdminDashboard() {
  const [cityCount, setCityCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const cities = await getAllCities();
        setCityCount(cities.length);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">meet.js Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Cities</h2>
          <p className="text-3xl font-bold text-gray-900">
            {loading ? 'Loading...' : cityCount}
          </p>
          <Link 
            href="/admin/cities"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm"
          >
            Manage cities →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Events</h2>
          <p className="text-3xl font-bold text-gray-900">Coming Soon</p>
          <span className="mt-4 inline-block text-gray-400 text-sm">
            Feature not yet implemented
          </span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Discounts</h2>
          <p className="text-3xl font-bold text-gray-900">Coming Soon</p>
          <span className="mt-4 inline-block text-gray-400 text-sm">
            Feature not yet implemented
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <Link 
            href="/admin/cities"
            className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700"
          >
            Manage Cities
          </Link>
          <div className="p-3 bg-gray-50 rounded-md text-gray-400">
            Manage Events (Coming Soon)
          </div>
          <div className="p-3 bg-gray-50 rounded-md text-gray-400">
            Manage Discounts (Coming Soon)
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <ActivityLogViewer />
      </div>

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.493-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This is a basic admin interface. More features will be added as the CMS system evolves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}