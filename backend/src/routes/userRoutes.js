import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// All routes below will use these middlewares
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
