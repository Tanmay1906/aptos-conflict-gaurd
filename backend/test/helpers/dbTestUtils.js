import { sequelize } from '../../src/config/sequelize.js';
import { User } from '../../src/models/User.js';
import { Case } from '../../src/models/Case.js';

/**
 * Clears all data from the test database
 */
export const clearDatabase = async () => {
  // Drop all tables in reverse order to respect foreign key constraints
  await Case.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
  
  // Reset auto-increment counters
  await sequelize.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
  await sequelize.query('ALTER SEQUENCE cases_id_seq RESTART WITH 1;');
};

/**
 * Sets up the test database by syncing all models
 */
export const setupTestDatabase = async () => {
  // Force sync all models
  await sequelize.sync({ force: true });
};

export const createTestUser = async (userData = {}) => {
  const bcrypt = await import('bcryptjs');
  
  const defaultUser = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: await bcrypt.hash('TestPass123!', 12),
    role: 'law_firm',
    firm_address: '123 Test St',
    firm_phone: '1234567890',
    license_number: `TEST-${Date.now()}`,
  };

  return User.create({ ...defaultUser, ...userData });
};

export const createTestCase = async (caseData = {}, userId) => {
  const defaultCase = {
    caseNumber: `CASE-${Date.now()}`,
    lawyerName: 'Test Lawyer',
    clientName: 'Test Client',
    opponentName: 'Test Opponent',
    caseDescription: 'Test case description',
    conflictDetected: false,
    userId: userId || 1,
  };

  return Case.create({ ...defaultCase, ...caseData });
};
