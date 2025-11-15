import { Router } from 'express';
import { protect } from '../middleware/auth.js';

const router = Router();

// Protected route to get blockchain balance
router.get('/balance', protect, (req, res) => {
  res.json({
    success: true,
    data: {
      balance: '0',
      currency: 'APT',
      address: req.user.walletAddress || '0x0'
    }
  });
});

export default router;
