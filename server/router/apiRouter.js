import express from "express";
import { LoginKakao } from "../controller/login/kakao.js";
import { LoginGoogle } from "../controller/login/google.js";
const apiRouter = express.Router();

apiRouter.post("/kakao", LoginKakao);
apiRouter.post("/google", LoginGoogle);
export default apiRouter;
