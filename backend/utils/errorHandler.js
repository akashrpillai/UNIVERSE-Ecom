class ErrorHandler extends Error {
    constructor(message, statuscode) {
        // console.log(message, statuscode)
        super(message)
        this.statuscode = statuscode

        Error.captureStackTrace(this, this.constructor)
        // console.log(this, this.constructor)
    }

}

module.exports = ErrorHandler