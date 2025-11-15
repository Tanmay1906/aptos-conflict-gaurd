import User from '../src/models/User.js';
import bcrypt from 'bcryptjs';
import { sequelize } from '../src/config/sequelize.js';

const seedDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ where: { email: 'demo@lexguard.com' } });
    
    if (existingUser) {
      console.log('Demo user already exists');
      process.exit(0);
    }

    // Create demo user
    const hashedPassword = await bcrypt.hash('DemoPass123', 10);
    
    await User.create({
      name: 'Demo Law Firm',
      email: 'demo@lexguard.com',
      password: hashedPassword,
      role: 'law_firm',
      firmDetails: {
        address: '123 Demo St, Law City',
        phone: '123-456-7890',
        licenseNumber: 'DEMO12345'
      }
    });

    console.log('Demo user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo user:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDemoUser();
