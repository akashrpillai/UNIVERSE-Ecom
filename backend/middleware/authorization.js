const CatchAsyncErrors = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = CatchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token)
    if(!token){
        return next(new ErrorHandler("Please Login To access this Resource",401));
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedToken.id)    // sending user details in req.user
    next();
}); 
exports.authorizeRoles = (...roles)=>{
    // console.log(...roles)
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is Not Authorized To Access This Resource`,403));
        }
        next();
    }
    
}