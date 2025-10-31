import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
const envPath = join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

async function testCreatePlan() {
  try {
    console.log('🧪 Testing Subscription Plan Creation...');
    console.log('Environment Variables:');
    console.log('XENDIT_API_KEY:', process.env.XENDIT_API_KEY ? '✅ Set' : '❌ Not Set');
    console.log('XENDIT_BASE_URL:', process.env.XENDIT_BASE_URL || '❌ Not Set');
    
    if (!process.env.XENDIT_API_KEY) {
      throw new Error('XENDIT_API_KEY is not set');
    }
    
    if (!process.env.XENDIT_BASE_URL) {
      throw new Error('XENDIT_BASE_URL is not set');
    }

    // Test data for creating a subscription plan
    const planData = {
      name: 'Test Basic Plan',
      type: 'MONTHLY',
      price_usd: 29,
      price_idr: 435000,
      price_promo_usd: 19,
      price_promo_idr: 285000,
      features: {
        basic: {
          profile_reports: 5,
          hashtag_reports: 3,
          historical_data: '30 days',
          exports: ['PDF'],
          processing_benefits: 'Standard'
        },
        advanced: {
          competitor_analysis: false,
          trend_analysis: false,
          custom_insights: false
        },
        processing: {
          priority_support: false,
          dedicated_analyst: false,
          custom_reporting: false
        }
      }
    };

    console.log('\n📝 Plan Data to Create:');
    console.log(JSON.stringify(planData, null, 2));

    // Test creating plan via API
    console.log('\n🚀 Testing API endpoint...');
    const response = await fetch('http://localhost:5000/api/admin/subscription-plans/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Plan created successfully!');
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      const errorData = await response.text();
      console.log('❌ Failed to create plan');
      console.log('Status:', response.status);
      console.log('Response:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error testing plan creation:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testCreatePlan()
  .then(() => {
    console.log('\n🎉 Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  }); 