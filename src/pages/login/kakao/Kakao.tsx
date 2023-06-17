import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../../../assets/Logo_kakao.svg";

const HOST: string = "https://kauth.kakao.com" as const;
const KAKAO_URL: string = `${HOST}/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
console.log(KAKAO_URL);
const KaKao = () => {
  const Login = async () => {
    window.location.href = KAKAO_URL;
  };
  return (
    <KakaoBtn onClick={Login}>
      <Logo src={logo} />
      카카오로 로그인하기
    </KakaoBtn>
  );
};

export default KaKao;

const KakaoBtn = styled.button`
  width: 320px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 12.6186px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;
  position: relative;
  background-color: #fee500;
  border: 1.3px solid #fee500;
  :hover {
    background-color: white;
  }
  @media screen and (max-width: 480px) {
    width: 240px;
    height: 50px;
    font-size: 0.8rem;
  }
`;

const Logo = styled.img`
  width: 30px !important;
  height: 30px !important;
  position: absolute;
  left: 20px;
  bottom: 14px;
  @media screen and (max-width: 680px) {
    width: 20px !important;
    height: 20px !important;
  }
`;
