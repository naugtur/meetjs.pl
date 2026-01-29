import { logActivity, getActivityLogs, getRecentActivityLogs } from '../src/lib/activity-logger';
import { updateCityStatus } from '../src/lib/cms/city';

async function testActivityLogging() {
  console.log('🧪 Testing Activity Logging System...\n');

  // Test 1: Log a simple activity
  console.log('Test 1: Log simple activity');
  try {
    const log = await logActivity({
      userId: 'test-user-1',
      userName: 'Test User',
      userEmail: 'test@example.com',
      action: 'updated',
      resourceType: 'city',
      resourceId: 'krakow',
      resourceName: 'Kraków',
      changes: [{
        field: 'status',
        oldValue: 'paused',
        newValue: 'active'
      }]
    });
    console.log('✅ Activity logged:', log.id);
  } catch (error) {
    console.error('❌ Failed to log activity:', error);
  }

  // Test 2: Update city status with logging
  console.log('\nTest 2: Update city status with logging');
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

  // Test 3: Get recent activity logs
  console.log('\nTest 3: Get recent activity logs');
  try {
    const recentLogs = await getRecentActivityLogs(10);
    console.log(`✅ Found ${recentLogs.length} recent activity logs`);
    if (recentLogs.length > 0) {
      console.log('  Latest log:', recentLogs[0].action, recentLogs[0].resourceName);
    }
  } catch (error) {
    console.error('❌ Failed to get recent logs:', error);
  }

  // Test 4: Get filtered activity logs
  console.log('\nTest 4: Get filtered activity logs (cities only)');
  try {
    const cityLogs = await getActivityLogs({ resourceType: 'city' });
    console.log(`✅ Found ${cityLogs.length} city activity logs`);
  } catch (error) {
    console.error('❌ Failed to get filtered logs:', error);
  }

  console.log('\n🎉 Activity logging tests completed!');
}

testActivityLogging().catch(console.error);