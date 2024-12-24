import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Mongodb connection error ", err);
  });
