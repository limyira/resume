import "dotenv/config.js";
import express from "express";
import apiRouter from "./router/apiRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";
const app = express();

const PORT = 8080 || process.env.PUBLIC_URL;

app.use(cookieParser());
app.use(
  session({
    secret: process.env.MONGO_SECRET,
    resave: false,
    saveUninitialized: true,
    stroe: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/oauth", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
