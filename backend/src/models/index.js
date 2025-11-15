const { sequelize } = require('../config/sequelize');
const User = require('./User');
const Case = require('./Case');

// Import other models here
// const ModelName = require('./ModelName');

// Define associations here
User.hasMany(Case, { foreignKey: 'userId' });
Case.belongsTo(User, { foreignKey: 'userId' });
// Example:
// User.hasMany(OtherModel, { foreignKey: 'userId' });
// OtherModel.belongsTo(User, { foreignKey: 'userId' });

// Sync all models with the database
const syncModels = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // In development, use alter: true to update tables without dropping
      await sequelize.sync({ alter: true });
      console.log('Database synced with alter');
    } else if (process.env.NODE_ENV === 'test') {
      // In test, use force: true to drop and recreate tables
      await sequelize.sync({ force: true });
      console.log('Test database synced with force');
    } else {
      // In production, don't use force or alter
      await sequelize.sync();
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  User,
  Case,
  // Export other models here
  syncModels,
};
