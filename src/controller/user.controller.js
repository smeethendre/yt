import {asyncHandler} from "../util/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {

    res.status(200).json({
        message: "ok"
    })
})

export {registerUser}