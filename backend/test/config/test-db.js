export const testDbConfig = {
  username: process.env.TEST_DB_USER || 'postgres',
  password: processEnv.TEST_DB_PASSWORD || 'postgres',
  database: process.env.TEST_DB_NAME || 'aptos_conflict_guard_test',
  host: process.env.TEST_DB_HOST || '127.0.0.1',
  port: Number(process.env.TEST_DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
  // Use a different database for testing
  database: 'aptos_conflict_guard_test',
};
