import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

const app = express();

connectDb()
  .then(() => {
    app.listen(process.env.Port || 8000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch(console.error("connection failed to db"));
