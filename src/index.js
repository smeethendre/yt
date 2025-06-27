import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express";

dotenv.config();

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(` Connection to DB failed: ${error}`);
  });
