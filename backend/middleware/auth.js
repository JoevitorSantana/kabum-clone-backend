const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login for acces this resources", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoutes = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can't access this resources`));
        }
        next();
    }
}