import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Db connection successful: ${connectionInstance}`);
        
    } catch (error) {
        console.log(`db conneciton error: ${error.message}`);
    }
}

export {connectDb}