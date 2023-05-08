import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import User from "../../model/User.js";

export const LoginKakao = async (req, res) => {
  const { code } = req.body;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    code: code,
    client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  };
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const requestToken = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  const info = jwt.decode(requestToken.id_token);
  const existing_user = await User.findOne({ email: info.email });
  let _id = existing_user === null ? null : existing_user._id;
  if (!existing_user) {
    const user = await User.create({
      email: info.email,
      name: info.nickname,
      access_token: requestToken.access_token,
      refresh_token: requestToken.refresh_token,
    });
    _id = user._id;
  }
  return res.status(200).json({
    access_token: requestToken.access_token,
    refresh_token: requestToken.refresh_token,
    _id,
  });
};
