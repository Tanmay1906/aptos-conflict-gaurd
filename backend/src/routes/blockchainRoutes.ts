import { Router, Request, Response, NextFunction } from 'express';
import { Account } from '@aptos-labs/ts-sdk';
import { BlockchainService } from '../services/blockchainService.js';
import { protect } from '../middleware/auth.js';

const router = Router();
const blockchainService = BlockchainService.getInstance();

// Get account resources
router.get('/accounts/:address/resources', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resources = await blockchainService.getAccountResources(req.params.address);
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

// Fund account (for testnet/devnet)
router.post('/accounts/fund', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address, amount = 100_000_000 } = req.body;
    const result = await blockchainService.fundAccount(address, amount);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

// Submit signed transaction
router.post('/transactions', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { signedTxn } = req.body;
    const result = await blockchainService.submitTransaction(signedTxn);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

// Transfer tokens
router.post('/transfer', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipient, amount, coinType } = req.body;
    // For demo purposes, using a dummy signer. In production, this should come from user wallet
    const signer = Account.generate(); // This creates a random account, not good for prod
    const result = await blockchainService.transferToken(signer, recipient, amount, coinType);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

export default router;
