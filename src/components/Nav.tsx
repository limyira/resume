import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "../utils/cooke";
import logo from "../assets/resueme.svg";
interface IProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const Nav = ({ isLogin, setIsLogin }: IProps) => {
  const nav = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    removeCookie("access_token");
    setIsLogin(false);
    nav("/");
  };
  useEffect(() => {
    const isUser = sessionStorage.getItem("_id");
    if (isUser) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <>
      <BackBtn onClick={() => nav("/")}>
        <Logo src={logo} />
      </BackBtn>
      {isLogin && <Logout onClick={logout}>로그아웃</Logout>}
    </>
  );
};

export default Nav;

const BackBtn = styled.div`
  position: absolute;
  width: 120px;
  height: 60px;
  z-index: 9999;
  top: 10%;
  left: 5%;
  cursor: pointer;
`;

const Logout = styled.div`
  position: absolute;
  font-size: 1rem;
  z-index: 9999;
  top: 10%;
  right: 5%;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;
