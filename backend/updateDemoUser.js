import { sequelize } from './src/config/sequelize.js';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';

const updateDemoUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const demoUser = await User.findOne({
      where: { email: 'demo@lexguard.com' }
    });

    if (!demoUser) {
      console.log('Demo user not found');
      return;
    }

    // Set the password (it will be hashed by the beforeSave hook)
    demoUser.password = 'DemoPass123';
    await demoUser.save();
    
    console.log('Demo user password updated successfully');
  } catch (error) {
    console.error('Error updating demo user:', error);
  } finally {
    await sequelize.close();
  }
};

updateDemoUser();
