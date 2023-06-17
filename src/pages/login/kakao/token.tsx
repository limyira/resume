import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { setItem } from "../../../utils/session";
import { isLoginAtom } from "../../../utils/atom";
import { useSetRecoilState } from "recoil";
import { setCookie } from "../../../utils/cooke";

const Token = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(isLoginAtom);
  const getCode = async () => {
    const code: string | null = new URLSearchParams(window.location.search).get(
      "code"
    );
    const response: AxiosResponse = await axios.post(
      "https://resume-api.com/api/oauth/kakao",
      {
        code,
      }
    );
    console.log(response);
    setItem("_id", response.data._id);
    setCookie("access_token", response.data.access_token);
    setItem("refresh_token", response.data.refresh_token);
    nav("/");
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default Token;
