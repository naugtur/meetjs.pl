'use client';

import { useState, useEffect } from 'react';
import { getAllCities, updateCityStatus } from '@/lib/cms/city';
import { CMSCity } from '@/lib/cms/types';
import Link from 'next/link';

export default function CitiesAdmin() {
  const [cities, setCities] = useState<CMSCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingCity, setUpdatingCity] = useState<string | null>(null);

  useEffect(() => {
    async function loadCities() {
      try {
        const data = await getAllCities();
        setCities(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cities');
        setLoading(false);
        console.error('Error loading cities:', err);
      }
    }
    loadCities();
  }, []);

  const handleStatusChange = async (cityId: string, newStatus: CMSCity['status']) => {
    setUpdatingCity(cityId);
    try {
      // Get current user from localStorage (simple auth)
      const userId = localStorage.getItem('meetjs-admin-user-id') || 'unknown';
      const userName = localStorage.getItem('meetjs-admin-user-name') || 'Unknown User';
      const userEmail = localStorage.getItem('meetjs-admin-user-email') || 'unknown@example.com';

      const updatedCity = await updateCityStatus(
        cityId, 
        newStatus, 
        'admin-interface',
        userId,
        userName,
        userEmail
      );
      setCities(cities.map(c => c.id === cityId ? updatedCity : c));
    } catch (err) {
      setError(`Failed to update ${cityId}`);
      console.error(`Error updating city ${cityId}:`, err);
    } finally {
      setUpdatingCity(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    const base = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'active': return `${base} bg-green-100 text-green-800`;
      case 'paused': return `${base} bg-yellow-100 text-yellow-800`;
      case 'coming-soon': return `${base} bg-blue-100 text-blue-800`;
      case 'new': return `${base} bg-gray-100 text-gray-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">City Management</h1>
        <p>Loading cities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">City Management</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">City Management</h1>
        <Link 
          href="/admin"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Back to Admin
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cities.map(city => (
              <tr key={city.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadgeClass(city.status)}>
                    {city.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(city.lastUpdated).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    by {city.updatedBy}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={city.status}
                    onChange={(e) => handleStatusChange(city.id, e.target.value as CMSCity['status'])}
                    disabled={updatingCity === city.id}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="new">New</option>
                  </select>
                  {updatingCity === city.id && (
                    <span className="ml-2 text-blue-500 text-sm">Updating...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Total cities: {cities.length}
      </div>
    </div>
  );
}