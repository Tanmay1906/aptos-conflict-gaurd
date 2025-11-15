import { AptosClient, AptosAccount } from '@aptos-labs/ts-sdk';

const NODE_URL = 'https://fullnode.testnet.aptoslabs.com';

export const aptosClient = new AptosClient(NODE_URL);

// Function to get account balance
export const getAccountBalance = async (address: string) => {
  try {
    const resources = await aptosClient.getAccountResources(address);
    const coinResource = resources.find(r => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
    if (coinResource) {
      return (coinResource.data as any).coin.value;
    }
    return '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
};

// Function to transfer tokens
export const transferTokens = async (
  signer: AptosAccount,
  recipient: string,
  amount: number
) => {
  const payload = {
    function: '0xe57cc832da53b0676291024beae6b66174dada2234034855a9feaded1bccedab::token_transfer::transfer',
    typeArguments: ['0x1::aptos_coin::AptosCoin'],
    functionArguments: [recipient, amount.toString()],
  };

  const txnRequest = await aptosClient.generateTransaction(signer.address(), payload);
  const signedTxn = await aptosClient.signTransaction(signer, txnRequest);
  const txnResponse = await aptosClient.submitTransaction(signedTxn);
  await aptosClient.waitForTransaction(txnResponse.hash);
  return txnResponse;
};
