class ApiError extends Error{
    constructor(statusCode, message = "Something went wrong", error=[], statck=""){

        super(message),
        this.statusCode = statusCode,
        this.success = false, 
        this.data = null, 
        this.error = error, 
        this.name = "ApiError"
    }
}

export {ApiError}