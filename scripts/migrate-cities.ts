import { CITIES } from '../src/content/cities';
import fs from 'fs/promises';
import path from 'path';
import { createCity } from '../src/lib/cms/city';

async function migrateCities() {
  console.log('Starting city migration...');
  
  // Ensure cities directory exists
  const citiesDir = path.join(process.cwd(), 'src/cms/cities');
  await fs.mkdir(citiesDir, { recursive: true });
  
  // Migrate each city
  for (const city of CITIES) {
    try {
      const cityData = {
        name: city.name,
        href: city.href,
        status: city.status,
        coordinates: {
          lat: city.pointPosition.y,
          lng: city.pointPosition.x
        },
        description: `Meet.js ${city.name} community`,
        coverImage: `/city/${city.href}/cover.jpg`,
        organizers: [],
        sponsors: [],
        events: []
      };
      
      const createdCity = await createCity(cityData);
      console.log(`✅ Migrated: ${city.name} (${createdCity.id})`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${city.name}:`, error);
    }
  }
  
  console.log('🎉 City migration completed!');
}

migrateCities().catch(console.error);