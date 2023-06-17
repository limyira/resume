import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import User from "../../model/User.js";
export const LoginGoogle = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const config = {
    code: token,
    client_id: process.env.REACT_APP_GOOGLE_KEY,
    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
    redirect_uri: "https://resumehelper.vercel.app/",
    grant_type: "authorization_code",
  };
  const baseUrl = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);
  const requestToken = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  console.log(requestToken);
  const info = jwt.decode(requestToken.id_token);
  console.log(info);
  const existing_user = await User.findOne({ email: info.email });
  let _id;
  if (!existing_user) {
    const user = await User.create({
      email: info.email,
      name: info.name,
    });
    const newUser = await User.findOne({ email: info.email });
    _id = newUser._id;
  } else {
    _id = existing_user._id;
  }
  const access_token = jwt.sign({ _id }, process.env.ACCESS_SECRET, {
    expiresIn: "10m",
  });
  const refresh_token = jwt.sign({ _id }, process.env.REFRESH_SECRET, {
    expiresIn: "6h",
  });
  return res.status(200).json({
    access_token,
    refresh_token,
    _id,
  });
};
