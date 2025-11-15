import { sequelize } from './sequelize.js';

export const connectDB = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with the database
    await sequelize.sync({ 
      alter: true,
      logging: console.log, // Log SQL queries
      // Prevent dropping constraints that don't exist
      alter: {
        drop: false
      }
    });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
