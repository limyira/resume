import Axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cooke";
import { getItem, setItem } from "./session";

let isTokenRefreshing = false; // 토큰 갱신 중인지 여부를 나타내는 변수

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // API 기본 주소
});

axios.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("access_token"); // 쿠키에 있는 AccessToken 토큰 가져오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    console.log(originalConfig);

    // 중복된 에러 처리 방지를 위한 조건 추가
    if (!isTokenRefreshing && error.response.status === 401) {
      isTokenRefreshing = true; // 토큰 갱신 중임을 표시

      const refresh_token = getItem("refresh_token");
      const access_token = getCookie("access_token");

      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/reissue`,
          { refresh_token, access_token }
        );
        setCookie("access_token", response.data.access_token);
        isTokenRefreshing = false; // 토큰 갱신 완료
        originalConfig.headers.Authorization = `Bearer ${response.data.access_token}`;
        // 변경된 access token으로 원래 요청 재시도
        return Axios(originalConfig);
      } catch (error) {
        console.error("토큰 재발급 요청 실패:", error);
        isTokenRefreshing = false; // 토큰 갱신 실패
        removeCookie("access_token");
        sessionStorage.clear();
        // refresh token 요청에 실패한 경우에 대한 처리
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
