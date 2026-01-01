import { getAllCities, getCityById, updateCityStatus } from '../src/lib/cms/city';

async function testCMS() {
  console.log('🧪 Testing CMS functions...\n');
  
  // Test 1: Get all cities
  console.log('Test 1: Get all cities');
  try {
    const cities = await getAllCities();
    console.log(`✅ Found ${cities.length} cities`);
    cities.slice(0, 3).forEach(city => {
      console.log(`  - ${city.name} (${city.status})`);
    });
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 2: Get specific city
  console.log('\nTest 2: Get specific city (Kraków)');
  try {
    const krakow = await getCityById('kraków');
    console.log(`✅ Found: ${krakow.name}`);
    console.log(`  Status: ${krakow.status}`);
    console.log(`  Coordinates: ${krakow.coordinates.lat}, ${krakow.coordinates.lng}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 3: Update city status
  console.log('\nTest 3: Update city status');
  try {
    const original = await getCityById('katowice');
    console.log(`  Original status: ${original.status}`);
    
    const updated = await updateCityStatus('katowice', 'active', 'test-script');
    console.log(`✅ Updated status to: ${updated.status}`);
    console.log(`  Status history entries: ${updated.statusHistory.length}`);
    
    // Revert the change
    await updateCityStatus('katowice', original.status, 'test-script');
    console.log(`✅ Reverted status back to: ${original.status}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  console.log('\n🎉 CMS tests completed!');
}

testCMS().catch(console.error);