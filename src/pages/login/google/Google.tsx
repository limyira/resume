import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { requestToken } from "./Token";
import { setCookie } from "../../../utils/cooke";
import { setItem } from "../../../utils/session";
import { IResponse } from "./type";
import logo from "../../../assets/Logo_google.svg";

const Google = () => {
  const nav = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (responseToken) => {
      try {
        const token: string = responseToken.code;
        const response: IResponse = await requestToken(token);
        setItem("_id", response._id);
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
      <GoogleBtn onClick={() => login()}>
        <Logo src={logo} />
        구글로 로그인하기
      </GoogleBtn>
    </>
  );
};

export default Google;

const GoogleBtn = styled.button`
  width: 320px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 40px;
  border-radius: 12.6186px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;
  position: relative;
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
  width: 30px !important;
  height: 30px !important;
  position: absolute;
  left: 20px;
  bottom: 14px;
  @media screen and (max-width: 680px) {
    width: 25px !important;
    height: 25px !important;
  }
`;
