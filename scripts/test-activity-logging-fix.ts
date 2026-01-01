import { updateCityStatus } from '../src/lib/cms/city';
import { getRecentActivityLogs } from '../src/lib/activity-logger';

async function testActivityLoggingFix() {
  console.log('🧪 Testing Activity Logging Fix...\n');

  // Test: Update city status with proper user info
  console.log('Test: Update city status with user info');
  try {
    const updatedCity = await updateCityStatus(
      'krakow',
      'active',
      'test-script',
      'test-user-1',
      'Test User',
      'test@example.com'
    );
    console.log('✅ City status updated:', updatedCity.status);
  } catch (error) {
    console.error('❌ Failed to update city status:', error);
  }

  // Wait a moment for the log to be written
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test: Check if activity was logged
  console.log('\nTest: Check if activity was logged');
  try {
    const recentLogs = await getRecentActivityLogs(10);
    console.log(`✅ Found ${recentLogs.length} recent activity logs`);
    
    const cityLogs = recentLogs.filter(log => log.resourceType === 'city');
    if (cityLogs.length > 0) {
      console.log('✅ Found city activity logs:', cityLogs.length);
      console.log('  Latest city log:', JSON.stringify(cityLogs[0], null, 2));
    } else {
      console.log('⚠️ No city activity logs found');
    }
  } catch (error) {
    console.error('❌ Failed to get recent logs:', error);
  }

  console.log('\n🎉 Activity logging fix test completed!');
}

testActivityLoggingFix().catch(console.error);