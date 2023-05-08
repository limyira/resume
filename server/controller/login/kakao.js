import fetch from "node-fetch";
import jwt from "jsonwebtoken";

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
  return res.status(200).json({
    access_token: requestToken.access_token,
    refresh_token: requestToken.refresh_token,
  });
};
// const res_kakao: AxiosResponse = await axios.post<IData>(
//   `https://kauth.kakao.com/oauth/token`,
//   {
//     grant_type: "authorization_code",
//     client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
//     code: code,
//     client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
//     redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
//   },
//   {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   }
// );
// const data: IData = res_kakao.data;
// const res_server: AxiosResponse = await axios.get<IData_Sever>(
//   "http://localhost:8080/api/oauth/kakao",
//   {
//     headers: {
//       Authorization: `${data.access_token}`,
//     },
//   }
// );
// setItem("access_token", res_server.data.appToken);
// setItem("isLogin", "true");
// setIsLogin(true);
