import fetch from "node-fetch";
import jwt from "jsonwebtoken";
export const LoginGoogle = async (req, res) => {
  const { token } = req.body;
  const config = {
    code: token,
    client_id: process.env.REACT_APP_GOOGLE_KEY,
    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
    redirect_uri: "http://localhost:3000",
    grant_type: "authorization_code",
  };
  const baseUrl = "https://oauth2.googleapis.com/token";
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
  return res.status(200).json({
    access_token: requestToken.access_token,
    refresh_token: requestToken.refresh_token,
  });
};
