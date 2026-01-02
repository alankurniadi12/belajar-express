import product from '../models//product.model.js'    

async function findAll() {
    return await product.find()
}

async function findById(productId) {
    return await product.find(p => p.id === productId)
}

async function decreaseStockAtomic(productId, quantity) {
    return await product.findOneAndUpdate(
        {
        _id: productId,
        stock: {$gte: quantity}
        },
        {
            $inc: {stock: -quantity}
        },
        {
            new: true
        }

    )
}

async function decreaseStock(product, quantity = 1) {
    product.stock -= quantity
    await product.save()
    return product
}

export{
    findAll,
    findById,
    decreaseStockAtomic,
    decreaseStock
}