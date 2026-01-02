import { getAllProducts } from '../services/product.service.js'

async function getAllProductsConstroller(req, res) {
    const products = await getAllProducts()

    return res.status(200).json({
        products
    })
}

export {getAllProductsConstroller}