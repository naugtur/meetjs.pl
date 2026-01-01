async function testAPI() {
  const baseUrl = 'http://localhost:3000/api/cities';
  
  console.log('🧪 Testing API endpoints...\n');
  
  // Test 1: GET all cities
  console.log('Test 1: GET all cities');
  try {
    const response = await fetch(baseUrl);
    const cities = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`  Found ${cities.length} cities`);
    console.log(`  First city: ${cities[0]?.name}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 2: GET single city
  console.log('\nTest 2: GET single city (kraków)');
  try {
    const response = await fetch(`${baseUrl}?id=kraków`);
    const city = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`  City: ${city.name}`);
    console.log(`  Status: ${city.status}`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  // Test 3: PUT (update city status)
  console.log('\nTest 3: PUT update city status');
  try {
    const testCity = 'katowice';
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: testCity,
        status: 'active',
        changedBy: 'api-test'
      })
    });
    const result = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`  Updated ${testCity} to ${result.status}`);
    
    // Revert the change
    await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: testCity,
        status: 'new',
        changedBy: 'api-test'
      })
    });
    console.log(`✅ Reverted status back to 'new'`);
  } catch (error) {
    console.error('❌ Failed:', error);
  }
  
  console.log('\n🎉 API tests completed!');
}

testAPI().catch(console.error);