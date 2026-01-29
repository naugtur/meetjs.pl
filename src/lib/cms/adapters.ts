import { CMSCity } from './types';
import { City } from '@/content/cities';

/**
 * Converts a CMS city to the legacy City format expected by PolandMap component
 */
export function adaptCmsCityToLegacy(cmsCity: CMSCity): City {
  return {
    name: cmsCity.name,
    href: cmsCity.href,
    pointPosition: {
      x: cmsCity.coordinates.lng, // Note: using lng as x coordinate
      y: cmsCity.coordinates.lat  // Note: using lat as y coordinate
    },
    textPosition: {
      x: cmsCity.coordinates.lng + 4, // Add small offset for text
      y: cmsCity.coordinates.lat
    },
    status: cmsCity.status
  };
}

/**
 * Converts an array of CMS cities to legacy format
 */
export function adaptCmsCitiesToLegacy(cmsCities: CMSCity[]): City[] {
  return cmsCities.map(adaptCmsCityToLegacy);
}