import express from 'express'
import { getAllProductsConstroller } from '../controllers/product.controller.js'   
import authMiddleware from '../middlewares/auth.middleware.js'
import authorize from '../middlewares/role.middleware.js'

const router = express.Router()

router.get('/products', authMiddleware, authorize('admin'), getAllProductsConstroller)

export default router