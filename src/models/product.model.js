import mongoose from "mongoose";    

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    }
})
//'Product' is name colection of learning_express_db
const Product = mongoose.model('Product', productSchema)

export default Product