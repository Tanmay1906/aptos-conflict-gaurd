import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from '@jest/globals';
import { request } from '../test/__mocks__/supertest.js';
import { StatusCodes } from 'http-status-codes';
import { clearDatabase, setupTestDatabase, createTestUser, createTestCase } from '../test/helpers/dbTestUtils.js';

describe('Case Management API', () => {
  let authToken;
  let testUser;
  let testCase;
  const testPassword = 'TestPass123!';

  beforeAll(async () => {
    // Set up test database
    await setupTestDatabase();
    
    // Create a test user and log in
    testUser = await createTestUser({
      email: 'test@example.com',
      password: testPassword,
    });

    // Create a test case
    testCase = await createTestCase({
      caseNumber: 'TEST-123',
      lawyerName: 'John Doe',
      clientName: 'Jane Smith',
      opponentName: 'Acme Corp',
      userId: testUser.id,
    });

    // Login to get token
    const res = await request
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: testPassword
      });
    
    authToken = res.body.token;
  });

  afterAll(async () => {
    // Clean up database
    await clearDatabase();
  });

  describe('GET /api/v1/cases', () => {
    test('should get all cases for authenticated user', async () => {
      const res = await request
        .get('/api/v1/cases')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('should not get cases without authentication', async () => {
      const res = await request.get('/api/v1/cases');
      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('GET /api/v1/cases/:id', () => {
    test('should get a single case by ID', async () => {
      const res = await request
        .get(`/api/v1/cases/${testCase.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.caseNumber).toBe(testCase.caseNumber);
      expect(res.body.data.lawyerName).toBe('John Doe');
    });

    test('should return 404 for non-existent case', async () => {
      const res = await request
        .get('/api/v1/cases/999999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST /api/v1/cases', () => {
    test('should create a new case', async () => {
      const caseData = {
        caseNumber: 'NEW-456',
        lawyerName: 'Alice Johnson',
        clientName: 'Bob Williams',
        opponentName: 'XYZ Corp',
        caseDescription: 'Test case creation'
      };

      const res = await request
        .post('/api/v1/cases')
        .set('Authorization', `Bearer ${authToken}`)
        .send(caseData);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.caseNumber).toBe(caseData.caseNumber);
      expect(res.body.data.conflictDetected).toBeDefined();
    });

    test('should detect conflicts when adding a case', async () => {
      // First, create a case with a specific client/opponent
      await createTestCase({
        caseNumber: 'CONFLICT-1',
        lawyerName: 'Conflict Tester',
        clientName: 'Conflict Client',
        opponentName: 'Conflict Opponent',
        userId: testUser.id,
      });

      // Try to create a new case with the same client or opponent
      const res = await request
        .post('/api/v1/cases')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          caseNumber: 'CONFLICT-2',
          lawyerName: 'Another Lawyer',
          clientName: 'Conflict Client', // Same client as above
          opponentName: 'New Opponent',
          caseDescription: 'This should detect a conflict'
        });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body.data.conflictDetected).toBe(true);
    });
  });

  describe('PUT /api/v1/cases/:id', () => {
    test('should update an existing case', async () => {
      const updates = {
        caseDescription: 'Updated case description',
        clientName: 'Updated Client Name'
      };

      const res = await request
        .put(`/api/v1/cases/${testCase.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.data.caseDescription).toBe(updates.caseDescription);
      expect(res.body.data.clientName).toBe(updates.clientName);
    });
  });

  describe('DELETE /api/v1/cases/:id', () => {
    test('should delete a case', async () => {
      // First create a case to delete
      const newCase = await createTestCase({
        caseNumber: 'TO-DELETE',
        lawyerName: 'To Be Deleted',
        clientName: 'Delete Me',
        opponentName: 'Irrelevant',
        userId: testUser.id,
      });

      const res = await request
        .delete(`/api/v1/cases/${newCase.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual({});

      // Verify the case was actually deleted
      const getRes = await request
        .get(`/api/v1/cases/${newCase.id}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(getRes.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
