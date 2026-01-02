import AppError from "../utils/AppError.js";
import * as productRepository from '../repositories/product.repository.js'

async function getAllProducts() {
    return await productRepository.findAll()
}

async function decreaseStock(productId, quantity = 1) {
    const product = await productRepository.decreaseStockAtomic(productId, quantity)

    // const product = await productRepository.findById(productId)

    // product tidak ditemukan = ERROR
    if(!product) {
        throw new AppError('Product not found', 404)
    }
    // stok habis = STATUS BISNIS
    if(product.stock <= 0) {
        return {
            status: 'OUT OF STOCK'
        }
    }

    // await productRepository.decreaseStock(productId, quantity)

    return {
        status: 'SUCCESS',
        product
    }
}

export {getAllProducts, decreaseStock}