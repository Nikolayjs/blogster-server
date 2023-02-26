import express from 'express';
import {
  checkAuth,
  handleValidationErrors,
  registerValidation,
  loginValidation,
} from '../middleware/index.js';
import { UserController } from '../controllers/index.js';

const router = express.Router({ mergeParams: true });

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
router.get('/auth/me', checkAuth, UserController.getMe);
router.patch('/user/:id', UserController.update);

export default router;
