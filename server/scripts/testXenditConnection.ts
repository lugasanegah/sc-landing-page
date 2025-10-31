import dotenv from 'dotenv';
import { XenditService } from '../services/xendit.service';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
const envPath = join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

async function testXenditConnection() {
  try {
    console.log('🧪 Testing Xendit API Connection...');
    console.log('Environment Variables:');
    console.log('XENDIT_API_KEY:', process.env.XENDIT_API_KEY ? '✅ Set' : '❌ Not Set');
    console.log('XENDIT_BASE_URL:', process.env.XENDIT_BASE_URL || '❌ Not Set');
    console.log('XENDIT_PUBLIC_KEY:', process.env.XENDIT_PUBLIC_KEY ? '✅ Set' : '❌ Not Set');
    
    if (!process.env.XENDIT_API_KEY) {
      throw new Error('XENDIT_API_KEY is not set');
    }
    
    if (!process.env.XENDIT_BASE_URL) {
      throw new Error('XENDIT_BASE_URL is not set');
    }

    const xenditService = new XenditService();
    
    // Test basic connection by making a simple request
    console.log('\n🔗 Testing API connection...');
    
    // Test with a simple GET request to verify connectivity
    const testUrl = `${process.env.XENDIT_BASE_URL}/v2/balance`;
    console.log('Testing URL:', testUrl);
    
    try {
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.XENDIT_API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Xendit API connection successful!');
        console.log('Response:', JSON.stringify(data, null, 2));
      } else {
        const errorData = await response.text();
        console.log('❌ Xendit API connection failed');
        console.log('Status:', response.status);
        console.log('Response:', errorData);
        
        // If 404, try a different endpoint to test basic connectivity
        if (response.status === 404) {
          console.log('\n🔄 Trying alternative endpoint for basic connectivity test...');
          const altUrl = `${process.env.XENDIT_BASE_URL}/v2/accounts`;
          console.log('Testing alternative URL:', altUrl);
          
          const altResponse = await fetch(altUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${Buffer.from(process.env.XENDIT_API_KEY + ':').toString('base64')}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (altResponse.ok) {
            console.log('✅ Basic connectivity successful with alternative endpoint!');
          } else {
            console.log('❌ Alternative endpoint also failed');
            console.log('Status:', altResponse.status);
          }
        }
      }
    } catch (fetchError) {
      console.log('❌ Fetch error:', fetchError);
      throw fetchError;
    }
    
  } catch (error) {
    console.error('❌ Error testing Xendit connection:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testXenditConnection()
  .then(() => {
    console.log('\n🎉 Test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });

export { testXenditConnection }; 