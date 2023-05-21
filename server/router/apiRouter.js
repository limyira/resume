import express from "express";
import { LoginKakao } from "../controller/login/kakao.js";
import { LoginGoogle } from "../controller/login/google.js";
import auth from "../middleware/auth.js";
import { getPosts, getPost, editPost } from "../controller/Posts.js";
import { postUpload } from "../controller/Posts.js";
const apiRouter = express.Router();

apiRouter.post("/oauth/kakao", LoginKakao);
apiRouter.post("/oauth/google", LoginGoogle);
apiRouter.post("/upload", auth, postUpload);
apiRouter.get("/posts", auth, getPosts);
apiRouter.get("/posts/:id", auth, getPost);
apiRouter.put("/posts/edit/:id", auth, editPost);
export default apiRouter;
