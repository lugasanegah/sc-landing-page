import { connectMongoDB } from '../db/mongodb';
import { Admin } from '../models/Admin';

async function createAdminUser() {
  try {
    await connectMongoDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Get admin credentials from environment variables or use defaults
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@socialcrab.id';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminRole = process.env.ADMIN_ROLE || 'super_admin';

    // Create admin user
    const admin = new Admin({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: adminRole
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Role: ${adminRole}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();