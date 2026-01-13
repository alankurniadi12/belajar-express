import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import { JWT_SECRET } from '../config/jwt.js';

function authMiddleware(req, res, next) {
    console.log('authMiddleware -> RUNNING....', authMiddleware)
    const authHeader = req.headers.authorization
    console.log('authMiddleware -> authHeader', authHeader)
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized', 401))
    }

    const token = authHeader.split(' ')[1]
    console.log('authMiddleware -> token', token)

    try {
        const payload = jwt.verify(token, JWT_SECRET)
        console.log('authMiddleware -> payload', payload)
        // menyimpan identitas pengguna untuk dipakai oleh middleware/route selanjutnya.
        req.user = { id: payload.userId, role: payload.role}
        // meneruskan kontrol ke middleware atau route handler berikutnya; mereka sekarang bisa mengakses req.user yg sudah punya nilai.
        return next()
    } catch(err) {
        return next(new AppError('Invalid token', 401))
    }
}

export default authMiddleware