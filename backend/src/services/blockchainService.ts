import { Aptos, Account, AptosConfig } from '@aptos-labs/ts-sdk';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain.js';

export class BlockchainService {
  private static instance: BlockchainService;
  private aptos: Aptos;

  private constructor() {
    const config = new AptosConfig({
      fullnode: BLOCKCHAIN_CONFIG.NODE_URL,
      faucet: BLOCKCHAIN_CONFIG.FAUCET_URL,
    });
    this.aptos = new Aptos(config);
  }

  public static getInstance(): BlockchainService {
    if (!BlockchainService.instance) {
      BlockchainService.instance = new BlockchainService();
    }
    return BlockchainService.instance;
  }

  public async getAccountResources(accountAddress: string) {
    return this.aptos.getAccountResources({ accountAddress });
  }

  public async fundAccount(address: string, amount: number) {
    return this.aptos.faucet.fundAccount({ accountAddress: address, amount });
  }

  public async submitTransaction(signedTxn: any): Promise<any> {
    // Assuming signedTxn is an object with transaction and senderAuthenticator
    return this.aptos.transaction.submit.simple(signedTxn);
  }

  public async transferToken(
    signer: Account,
    recipient: string,
    amount: number,
    coinType: string = '0x1::aptos_coin::AptosCoin'
  ): Promise<any> {
    const transaction = await this.aptos.transaction.build.simple({
      sender: signer.accountAddress,
      data: {
        function: `${BLOCKCHAIN_CONFIG.MODULE_ADDRESS}::token_transfer::transfer`,
        typeArguments: [coinType],
        functionArguments: [recipient, amount.toString()],
      },
    });

    const senderAuthenticator = this.aptos.transaction.sign({ signer, transaction });
    const submittedTransaction = await this.aptos.transaction.submit.simple({ transaction, senderAuthenticator });
    await this.aptos.waitForTransaction({ transactionHash: submittedTransaction.hash });
    return submittedTransaction;
  }
}
