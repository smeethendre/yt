import cors from "cors"
import express from 'express';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    limit: "16kb"
}))

app.use(cookieParser());

app.use(express.static("public"));

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

//routes

import userRouter from "./route/user.route.js";

//routes declaration 

app.use("/api/v1/users", userRouter)

export default app;