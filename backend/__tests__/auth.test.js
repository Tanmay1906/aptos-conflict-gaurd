import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from '@jest/globals';
import { request } from '../test/__mocks__/supertest.js';
import { StatusCodes } from 'http-status-codes';
import { clearDatabase, setupTestDatabase, createTestUser } from '../test/helpers/dbTestUtils.js';

describe('Authentication API', () => {
  let testUser;
  const testPassword = 'TestPass123!';

  beforeAll(async () => {
    // Set up test database
    await setupTestDatabase();
    
    // Create a test user
    testUser = await createTestUser({
      email: 'test@example.com',
      password: testPassword,
    });
  });

  afterAll(async () => {
    // Clean up database
    await clearDatabase();
  });

  beforeEach(() => {
    // Reset rate limiting for each test
    jest.resetModules();
  });

  describe('POST /api/v1/auth/register', () => {
    test('should register a new user', async () => {
      const userData = {
        name: 'New Test User',
        email: 'newuser@example.com',
        password: 'NewTestPass123!',
        role: 'law_firm',
        firmDetails: {
          address: '456 Test Ave',
          phone: '9876543210',
          licenseNumber: 'TEST-LICENSE-123'
        }
      };

      const res = await request
        .post('/api/v1/auth/register')
        .send(userData);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.role).toBe('law_firm');
    });

    test('should not register with invalid data', async () => {
      const res = await request
        .post('/api/v1/auth/register')
        .send({
          name: 'Test',
          email: 'invalid-email',
          password: '123'
        });

      expect(res.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    test('should login with valid credentials', async () => {
      const res = await request
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: testPassword
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@example.com');
    });

    test('should not login with invalid credentials', async () => {
      const res = await request
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body.success).toBe(false);
    });

    test('should apply rate limiting after multiple failed attempts', async () => {
      // Make 5 failed login attempts
      for (let i = 0; i < 5; i++) {
        await request
          .post('/api/v1/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          });
      }

      // The 6th attempt should be rate limited
      const res = await request
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: testPassword
        });

      expect(res.statusCode).toBe(StatusCodes.TOO_MANY_REQUESTS);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let authToken;

    beforeAll(async () => {
      // Login to get token
      const res = await request
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: testPassword
        });
      
      authToken = res.body.token;
    });

    test('should get current user with valid token', async () => {
      const res = await request
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.user.email).toBe('test@example.com');
      // Password should not be returned
      expect(res.body.data.user).not.toHaveProperty('password');
    });

    test('should not get user without token', async () => {
      const res = await request.get('/api/v1/auth/me');
      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
});
