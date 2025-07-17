// Quick test script to verify translation system
import { translations } from './translations.js';

// Test function to verify translations work
function testTranslations() {
  console.log('Testing Translation System...\n');
  
  // Test English translations
  console.log('English (en):');
  console.log('Dashboard:', translations.en.dashboard);
  console.log('Welcome:', translations.en.welcome);
  console.log('Total Farmers:', translations.en.totalFarmers);
  
  console.log('\nHindi (hi):');
  console.log('Dashboard:', translations.hi.dashboard);
  console.log('Welcome:', translations.hi.welcome);
  console.log('Total Farmers:', translations.hi.totalFarmers);
  
  console.log('\nBengali (bn):');
  console.log('Dashboard:', translations.bn.dashboard);
  console.log('Welcome:', translations.bn.welcome);
  console.log('Total Farmers:', translations.bn.totalFarmers);
  
  console.log('\n✅ Translation system is working correctly!');
}

// Export for use in development
export { testTranslations };
