import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/learning_express_db')
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB Connection error', error.message)
        process.exit(1)
    }
}

export default connectDB