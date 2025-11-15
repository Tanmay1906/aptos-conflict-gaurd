import { User } from '../../src/models/User.js';
import bcrypt from 'bcryptjs';

export const createTestUser = async (userData = {}) => {
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

export const getAuthToken = async (user) => {
  const response = await request
    .post('/api/v1/auth/login')
    .send({
      email: user.email,
      password: 'TestPass123!',
    });
  
  return response.body.token;
};
