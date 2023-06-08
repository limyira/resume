import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KaKao from "../login/kakao/Kakao";
import Google from "../login/google/Google";
import { getCookie } from "../../utils/cooke";
import { getItem } from "../../utils/session";

interface IProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}
const Main = ({ isLogin, setIsLogin }: IProps) => {
  const nav = useNavigate();
  useEffect(() => {
    const isUser = getItem("_id");
    if (isUser) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <Container>
      <Content>
        <H1>나만의 작은 자기소개서</H1>
        <P>로그인하고 나의 자기소개서를 관리해보세요</P>
        <Btn onClick={() => nav("/gpt")}>gpt 한테 도움받기</Btn>
        {!isLogin && <KaKao />}
        {!isLogin && <Google isLogin={isLogin} setIsLogin={setIsLogin} />}
        {isLogin && (
          <Btn onClick={() => nav("/upload")}>자기소개서작성하기</Btn>
        )}
        {isLogin && <Btn onClick={() => nav("/my")}>내가쓴 자기소개서</Btn>}
      </Content>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`;
const P = styled.p`
  font-size: 0.6rem;
  color: #afafaf;
  margin-bottom: 50px;
  text-align: center;
`;

const Content = styled.section`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 160px auto;
`;

const Btn = styled.div`
  width: 320px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 12.6186px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1.3px solid #51da4c;
  transition: 0.3s ease-in-out;
  :hover {
    color: #51da4c;
    background-color: black;
  }
  @media screen and (max-width: 480px) {
    width: 240px;
    height: 50px;
    font-size: 0.8rem;
  }
`;
