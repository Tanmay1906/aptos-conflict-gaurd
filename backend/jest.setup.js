// Mock the blockchain routes
jest.mock('../src/routes/blockchainRoutes.js', () => ({
  __esModule: true,
  default: require('./__mocks__/blockchainRoutes').default
}));
