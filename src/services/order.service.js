import { decreaseStock } from "./product.service.js";
import * as orderRepository from '../repositories/product.repository.js'

async function createOrder(productId, quantity = 1) {
    console.log('createOrder -> RUNNING', createOrder);
    console.log('createOrder -> productId', productId);
    
    const result = await orderRepository.decreaseStockAtomic(productId, quantity)
    console.log('createOrder -> result', result)

    if(!result) {
        return {status:'OUT_OF_STOCK'}
    }

    return {
        status: 'SUCCESS',
        result
    }

}

export {createOrder} 