import AppError from "../utils/AppError.js";

// Mengguankan ... pada parameter adalah suapaya bisa lebih dari 1 argument dan akan berbentuk array 
// misal: waktu memanggil fungsi ini di router -> router.post(authorize('admin', 'user'))
function authorize(...allowedRoles) {
    console.log('authorize RUNNING', allowedRoles)
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError ('Forbidden', 403))
        }
        return next()
    }
}

export default authorize