import express from "express";
import { LoginKakao } from "../controller/login/kakao.js";
import { LoginGoogle } from "../controller/login/google.js";
import { postUpload } from "../controller/upload.js";
import auth from "../middleware/auth.js";
import { mypost } from "../controller/mypost.js";
const apiRouter = express.Router();

apiRouter.post("/oauth/kakao", LoginKakao);
apiRouter.post("/oauth/google", LoginGoogle);
apiRouter.post("/upload", auth, postUpload);
apiRouter.get("/mypost", auth, mypost);
export default apiRouter;
