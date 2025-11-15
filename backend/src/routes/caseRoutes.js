import { Router } from 'express';
import { addCase, getCases, getCase } from '../controllers/caseController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.route('/').post(protect, addCase).get(protect, getCases);
router.route('/:id').get(protect, getCase);

export default router;
