import {asyncHandler} from "./src/util/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})