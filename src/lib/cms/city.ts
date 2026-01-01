// This module is server-only as it uses Node.js fs module
'use server';

import fs from 'fs/promises';
import path from 'path';
import { CMSCity, CityStatusChange } from './types';
import { logActivity } from '../activity-logger';

const CITIES_DIR = path.join(process.cwd(), 'src/cms/cities');

export async function getAllCities(): Promise<CMSCity[]> {
  try {
    const files = await fs.readdir(CITIES_DIR);
    return Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(file => getCityById(file.replace('.json', '')))
    );
  } catch (error) {
    console.error('Error reading cities directory:', error);
    return [];
  }
}

export async function getCityById(id: string): Promise<CMSCity> {
  const filePath = path.join(CITIES_DIR, `${id}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading city file ${id}:`, error);
    throw new Error(`City ${id} not found`);
  }
}

export async function updateCityStatus(
  id: string,
  newStatus: CMSCity['status'],
  changedBy: string = 'system',
  userId?: string,
  userName?: string,
  userEmail?: string
): Promise<CMSCity> {
  const city = await getCityById(id);
  
  // Create status change record
  const statusChange: CityStatusChange = {
    previousStatus: city.status,
    newStatus,
    changedBy,
    changedAt: new Date().toISOString(),
    reason: `Status updated to ${newStatus}`
  };
  
  // Update city data
  city.status = newStatus;
  city.lastUpdated = statusChange.changedAt;
  city.updatedBy = changedBy;
  city.statusHistory.push(statusChange);
  
  // Save updated city data
  const filePath = path.join(CITIES_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(city, null, 2), 'utf-8');

  // Log the activity if user info is provided
  if (userId) {
    try {
      await logActivity({
        userId,
        userName: userName || 'Unknown',
        userEmail: userEmail || 'unknown@example.com',
        action: 'updated',
        resourceType: 'city',
        resourceId: id,
        resourceName: city.name,
        changes: [{
          field: 'status',
          oldValue: statusChange.previousStatus,
          newValue: statusChange.newStatus
        }]
      });
    } catch (error) {
      console.error('Failed to log city status change:', error);
      // Don't fail the main operation if logging fails
    }
  }

  return city;
}

export async function createCity(cityData: Omit<CMSCity, 'id' | 'lastUpdated' | 'updatedBy' | 'statusHistory'> & { id?: string }): Promise<CMSCity> {
  const id = cityData.id || cityData.name.toLowerCase().replace(/\s+/g, '-');
  const filePath = path.join(CITIES_DIR, `${id}.json`);
  
  const newCity: CMSCity = {
    id,
    name: cityData.name,
    href: cityData.href || `/${id}`,
    status: cityData.status || 'new',
    coordinates: cityData.coordinates,
    organizers: cityData.organizers || [],
    sponsors: cityData.sponsors || [],
    events: cityData.events || [],
    description: cityData.description || `Meet.js ${cityData.name} community`,
    coverImage: cityData.coverImage,
    socialLinks: cityData.socialLinks,
    contactEmail: cityData.contactEmail,
    lastUpdated: new Date().toISOString(),
    updatedBy: 'system',
    statusHistory: [{
      previousStatus: 'new',
      newStatus: cityData.status || 'new',
      changedBy: 'system',
      changedAt: new Date().toISOString(),
      reason: 'City created'
    }]
  };
  
  await fs.writeFile(filePath, JSON.stringify(newCity, null, 2), 'utf-8');
  return newCity;
}

export async function deleteCity(id: string): Promise<boolean> {
  const filePath = path.join(CITIES_DIR, `${id}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting city ${id}:`, error);
    return false;
  }
}

export async function cityExists(id: string): Promise<boolean> {
  const filePath = path.join(CITIES_DIR, `${id}.json`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}