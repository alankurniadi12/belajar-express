import express from 'express'
import orderRoutes from '../src/routes/order.routes.js'
import productRoutes from '../src/routes/product.routes.js'
import errorHandler from './middlewares/error.middleware.js';
import authRoutes from '../src/routes/auth.routes.js';


const app = express();

app.use(express.json())
app.use(orderRoutes)
app.use(productRoutes)
app.use(authRoutes)
// error handler (always last)
app.use(errorHandler)

export default app