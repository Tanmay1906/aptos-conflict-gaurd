import { Router } from 'express';

const router = Router();

// Mock blockchain routes
router.get('/balance', (req, res) => {
  res.json({ success: true, data: { balance: '1000' } });
});

export default router;
