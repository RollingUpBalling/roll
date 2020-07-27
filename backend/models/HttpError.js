class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Add a message property for 
        this.code = errorCode;
        this.message = message;
    }
}
module.exports = HttpError;