import express from 'express';
import { createOrderController } from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/role.middleware.js';

const router = express.Router()

router.post('/orders', authMiddleware, authorize('user', 'admin'), createOrderController)

export default router