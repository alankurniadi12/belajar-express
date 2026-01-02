import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

const SALT_ROUNDS = 10

async function register(email, password, role) {
    const exists = await User.findOne({ email })
    if(exists) {
        throw new AppError('Email already registered', 409)
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await User.create({
        email,
        password: hashedPassword,
        role
    })
    console.log("INPUT USER FROM REGISTER", user);
    

    return{ id: user._id, email: user.email, role: user.role}
}

async function login(email, password) {
    const user = await User.findOne({email})

    if(!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new AppError('Invalid credentials', 401)
    }

    const token = jwt.sign(
        {userId: user._id, role: user.role},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    )

    return {
        token,
        user: { id: user._id, email: user.email}
    }
}

export { register, login }