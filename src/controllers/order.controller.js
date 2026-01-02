import { createOrder } from "../services/order.service.js";

async function createOrderController(req, res, next) {
    console.log('createOrderController -> RUNNING', createOrderController);
    try {
        const {productId} = req.body 
        console.log('createOrderController -> productId', productId)
        const result = await createOrder(productId)
        console.log('createOrderController -> result', result)
        if(result.status === 'OUT_OF_STOCK') {
            return res.status(409).json({
                message: 'Product is out of stock'
            })
        }

        return res.status(201).json ({
            message: 'Order created',
            order: result
        })
    } catch (error) {
        next(error)
    }
    console.log('createOrderController -> DONE', createOrderController)
}

export {createOrderController}