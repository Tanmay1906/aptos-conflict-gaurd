import supertest from 'supertest';
import app from '../../src/app.js';

// Create a test version of the app with a clean state for each test
export const request = supertest(app);
