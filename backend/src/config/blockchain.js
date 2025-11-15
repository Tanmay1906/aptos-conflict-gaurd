export const APTOS_NETWORKS = {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    DEVNET: 'devnet',
};
export const APTOS_NODE_URLS = {
    [APTOS_NETWORKS.MAINNET]: 'https://fullnode.mainnet.aptoslabs.com',
    [APTOS_NETWORKS.TESTNET]: 'https://fullnode.testnet.aptoslabs.com',
    [APTOS_NETWORKS.DEVNET]: 'https://fullnode.devnet.aptoslabs.com',
};
export const BLOCKCHAIN_CONFIG = {
    DEFAULT_NETWORK: process.env.APTOS_NETWORK || APTOS_NETWORKS.TESTNET,
    NODE_URL: process.env.APTOS_NODE_URL || APTOS_NODE_URLS[process.env.APTOS_NETWORK] || APTOS_NODE_URLS.testnet,
    FAUCET_URL: process.env.APTOS_FAUCET_URL || 'https://faucet.testnet.aptoslabs.com',
    MODULE_ADDRESS: process.env.APTOS_MODULE_ADDRESS || '0xe57cc832da53b0676291024beae6b66174dada2234034855a9feaded1bccedab',
};
//# sourceMappingURL=blockchain.js.map