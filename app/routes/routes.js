import express from 'express';
import AuthController from '../controllers/userController';

// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/login', AuthController.login);

// Presentation routes

export default router;