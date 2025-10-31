import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
const envPath = join(__dirname, '../../.env.local');
console.log('Loading environment from:', envPath);

dotenv.config({ path: envPath });

console.log('🧪 Testing Environment Variables...');
console.log('Current working directory:', process.cwd());
console.log('Environment file path:', envPath);

console.log('\nEnvironment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not Set');
console.log('XENDIT_API_KEY:', process.env.XENDIT_API_KEY ? '✅ Set' : '❌ Not Set');
console.log('XENDIT_BASE_URL:', process.env.XENDIT_BASE_URL || '❌ Not Set');
console.log('XENDIT_PUBLIC_KEY:', process.env.XENDIT_PUBLIC_KEY ? '✅ Set' : '❌ Not Set');

if (process.env.XENDIT_API_KEY) {
  console.log('XENDIT_API_KEY (first 10 chars):', process.env.XENDIT_API_KEY.substring(0, 10) + '...');
}

if (process.env.XENDIT_BASE_URL) {
  console.log('XENDIT_BASE_URL:', process.env.XENDIT_BASE_URL);
} 