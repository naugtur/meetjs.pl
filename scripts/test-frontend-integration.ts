import { getAllCities } from '../src/lib/cms/city';
import { adaptCmsCitiesToLegacy } from '../src/lib/cms/adapters';
import { City } from '../src/content/cities';

async function testFrontendIntegration() {
  console.log('🧪 Testing frontend integration...\n');
  
  // Test 1: Load CMS cities
  console.log('Test 1: Load CMS cities');
  try {
    const cmsCities = await getAllCities();
    console.log(`✅ Loaded ${cmsCities.length} cities from CMS`);
    console.log(`  First city: ${cmsCities[0]?.name} (${cmsCities[0]?.status})`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 2: Adapt CMS cities to legacy format
  console.log('\nTest 2: Adapt CMS cities to legacy format');
  try {
    const cmsCities = await getAllCities();
    const legacyCities = adaptCmsCitiesToLegacy(cmsCities);
    
    console.log(`✅ Adapted ${legacyCities.length} cities`);
    console.log(`  First adapted city: ${legacyCities[0]?.name}`);
    console.log(`  Coordinates: (${legacyCities[0]?.pointPosition.x}, ${legacyCities[0]?.pointPosition.y})`);
    console.log(`  Status: ${legacyCities[0]?.status}`);
    
    // Verify the structure matches the expected City interface
    const firstCity = legacyCities[0];
    const hasRequiredFields = 
      'name' in firstCity && 
      'href' in firstCity && 
      'pointPosition' in firstCity &&
      'textPosition' in firstCity &&
      'status' in firstCity;
      
    console.log(`✅ Legacy city structure valid: ${hasRequiredFields}`);
    
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 3: Verify specific city data
  console.log('\nTest 3: Verify specific city (Kraków)');
  try {
    const cmsCities = await getAllCities();
    const krakow = cmsCities.find(c => c.id === 'kraków');
    
    if (krakow) {
      console.log(`✅ Found Kraków in CMS`);
      console.log(`  Status: ${krakow.status}`);
      console.log(`  Coordinates: (${krakow.coordinates.lat}, ${krakow.coordinates.lng})`);
      
      const adaptedKrakow = adaptCmsCitiesToLegacy([krakow])[0];
      console.log(`  Adapted coordinates: (${adaptedKrakow.pointPosition.x}, ${adaptedKrakow.pointPosition.y})`);
    } else {
      console.log('❌ Kraków not found in CMS');
    }
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  console.log('\n🎉 Frontend integration tests completed!');
}

testFrontendIntegration().catch(console.error);