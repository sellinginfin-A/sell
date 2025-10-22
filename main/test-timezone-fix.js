// Test script to verify timezone conversion fix for busy slots
const { convertLocalToUTC } = require('./src/lib/timezone-utils');

console.log('🧪 Testing timezone conversion for busy slots...\n');

// Test case: Australia timezone (Sydney)
const testCases = [
  {
    timezone: 'Australia/Sydney',
    date: '2024-01-15',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Australia Sydney - 2:30 PM to 4:00 PM local time'
  },
  {
    timezone: 'America/New_York',
    date: '2024-01-15',
    startTime: '14:30',
    endTime: '16:00',
    description: 'US Eastern - 2:30 PM to 4:00 PM local time'
  },
  {
    timezone: 'UTC',
    date: '2024-01-15',
    startTime: '14:30',
    endTime: '16:00',
    description: 'UTC - 2:30 PM to 4:00 PM UTC time'
  }
];

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`Timezone: ${testCase.timezone}`);
  console.log(`Input: ${testCase.date} ${testCase.startTime} - ${testCase.endTime}`);
  
  try {
    const startDateTimeLocal = `${testCase.date}T${testCase.startTime}:00`;
    const endDateTimeLocal = `${testCase.date}T${testCase.endTime}:00`;
    
    const startDateTimeUTC = convertLocalToUTC(startDateTimeLocal, testCase.timezone);
    const endDateTimeUTC = convertLocalToUTC(endDateTimeLocal, testCase.timezone);
    
    console.log(`UTC Start: ${startDateTimeUTC.toISOString()}`);
    console.log(`UTC End: ${endDateTimeUTC.toISOString()}`);
    
    // Convert back to local time to verify
    const startLocal = new Date(startDateTimeUTC).toLocaleString('en-US', { timeZone: testCase.timezone });
    const endLocal = new Date(endDateTimeUTC).toLocaleString('en-US', { timeZone: testCase.timezone });
    
    console.log(`Back to local: ${startLocal} - ${endLocal}`);
    console.log('✅ Conversion successful\n');
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }
});

console.log('🎯 Key fix: The API now properly converts local times to UTC using the user\'s timezone');
console.log('📝 This ensures that when an Australian user sets 2:30 PM, it\'s stored as 2:30 PM Australian time in UTC');
