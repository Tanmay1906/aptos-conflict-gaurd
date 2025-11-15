import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const createDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({
      where: { email: 'demo@lexguard.com' }
    });

    if (existingUser) {
      console.log('Demo user already exists');
      return;
    }

    // Create demo law firm user
    const demoUser = await User.create({
      name: 'LexGuard Demo Law Firm',
      email: 'demo@lexguard.com',
      password: await bcrypt.hash('DemoPass123', 12),
      role: 'law_firm',
      firm_address: '123 Legal Street, Law City, LC 12345',
      firm_phone: '+1 (555) 123-4567',
      license_number: 'DEMO-LICENSE-001',
      is_active: true,
    });

    console.log('Demo user created successfully:', demoUser.id);
  } catch (error) {
    console.error('Error creating demo user:', error);
  }
};

export default createDemoUser;
