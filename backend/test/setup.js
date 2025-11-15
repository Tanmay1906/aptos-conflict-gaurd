// Use CommonJS require for test setup
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env.test')
});

// Set test database name
process.env.NODE_ENV = 'test';
process.env.TEST_DB_NAME = 'aptos_conflict_guard_test';

// Import Sequelize after environment is set
const { sequelize } = require('../src/config/sequelize');

// Close the Sequelize connection after all tests
afterAll(async () => {
  // Close all database connections
  await sequelize.close();
});
