const asyncErrorHandler = (trycatchFun) => {
    return (req, res, next) => {
        Promise.resolve(trycatchFun(req, res, next)).catch(next)

    }
}

module.exports = asyncErrorHandler
