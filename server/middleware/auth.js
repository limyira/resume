import User from "../model/User.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰을 가져옵니다.
    const token = req.headers.authorization?.split("Bearer ")[1];
    const expires = jwt.decode(token).exp * 1000;
    if (expires < Date.now()) {
      return res.status(401).json({ err: "access_token 만료" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ err: "서버 오류" });
  }
};

export default auth;
