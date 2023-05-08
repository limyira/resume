import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KaKao from "../login/kakao/Kakao";
import Google from "../login/google/Google";

const Main = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Content>
        <H1>나만의 작은 자기소개서</H1>
        <Btn style={{ backgroundColor: "white" }} onClick={() => nav("/gpt")}>
          gpt 한테 도움받기
        </Btn>
        <KaKao />
        <Google />
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
  background-color: blue;
`;

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
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
  margin-bottom: 40px;
  border-radius: 12.6186px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
