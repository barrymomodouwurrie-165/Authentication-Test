import express from "express";
import router from "./routers/userRouter.js";
import dotenv from "dotenv";
import { DB_connect } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", router);

const PORT = process.env.PORT || 5000;

DB_connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
  });
});
