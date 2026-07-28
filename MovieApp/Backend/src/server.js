import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(error.message)
  }
};

startServer()
