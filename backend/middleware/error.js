const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    // console.log(err)
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server Error";

    // For Wrong/invalid mongoDb Document Id
    if (err.name === "CastError") {
        const message = `Resource Not Found. invalid : ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    // For Duplicate Key In mongoDb
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`
        err = new ErrorHandler(message, 400)
    }

    // For Invalid JWT Token
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web token is  invalid , try agian`
        err = new ErrorHandler(message, 400)
    }
    // For Invalid JWT Token
    if (err.name === "TokenExpiredError") {
        const message = `Json Web token is Expired , try agian`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message   //err.stack to get full stack
    });
}
