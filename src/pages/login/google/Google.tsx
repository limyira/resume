import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { requestToken } from "./Token";
import { setCookie } from "../../../utils/cooke";
import { setItem } from "../../../utils/session";
const Google = () => {
  const nav = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (responseToken) => {
      try {
        const token: string = responseToken.code;
        const response = await requestToken(token);
        setCookie("access_token", response.access_token);
        setItem("refresh_token", response.refresh_token);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => {
      console.log(error);
    },
    flow: "auth-code",
    scope: process.env.REACT_APP_GOOGLE_SCOPE,
  });
  return (
    <>
      <GoogleBtn onClick={() => login()}>구글로 로그인하기</GoogleBtn>
    </>
  );
};

export default Google;

const GoogleBtn = styled.button`
  width: 532px;
  height: 81px;
  margin-top: 39px;
  background: #ffffff;
  border: 1.3px solid #d9d9d9;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  position: relative;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media screen and (max-width: 680px) {
    width: 267px;
    height: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-top: 11.38px;
  }
`;

const Logo = styled.img`
  width: 40px !important;
  height: 40px !important;
  position: absolute;
  left: 25px;
  bottom: 18px;
  @media screen and (max-width: 680px) {
    width: 25px !important;
    height: 25px !important;
  }
`;
