import "dotenv/config.js";
import express from "express";
import apiRouter from "./router/apiRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";
import jwt from "jsonwebtoken";
const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(
  session({
    secret: process.env.MONGO_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(
  cors({
    origin: "https://resumehelper.vercel.app",
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", apiRouter);
app.post("/reissue", async (req, res) => {
  const { refresh_token } = req.body;
  const { access_token } = req.body;
  const _id = jwt.decode(access_token)._id;
  if (!refresh_token) return res.status(401).json({ err: "리프레쉬 만료" });
  const new_access_token = await jwt.sign({ _id }, process.env.REFRESH_SECRET, {
    expiresIn: "10m",
  });
  return res.status(200).json({ access_token: new_access_token });
});
app.get("/", (req, res) => {
  res.send("welcome Resume Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
