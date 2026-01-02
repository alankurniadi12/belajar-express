import { login, register } from "../services/auth.service.js";

async function registerController(req, res, next) {
    try {
        const {email, password, role} = req.body
        const user = await register(email, password, role)
        return res.status(201).json({ user })
    } catch (e) {
        next(e)
    }
}

async function loginController(req, res, next) {
    try {
        const { email, password } = req.body 
        const result = await login(email, password)

        return res.status(200).json({
            token: result.token,
            user: result.user
        })
    } catch (err) {
        next(err)
    }
}

export {registerController, loginController}