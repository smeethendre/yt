const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fu(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: true, 
            message: error.message
        })
       
    }
}


export{asyncHandler}