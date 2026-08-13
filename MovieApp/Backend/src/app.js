import express from "express";
import cors from "cors";
import router from "./routes/contentRoute.js";
import authRoute from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/errorMidleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/content", router);

app.use("/api/auth", authRoute);

app.use(errorMiddleware);

export default app;
