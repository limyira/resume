import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  });
  console.log(isTrue);
  return (
    <>
      <Container isTrue={isTrue}>
        <Item>나작소</Item>
        <Item>
          <button>로그인</button>
          <button>마이페이지</button>
        </Item>
        {width < 680 && (
          <ResizeBtn onClick={() => setIsTrue((prev) => !prev)} />
        )}
      </Container>
    </>
  );
};

export default Nav;

interface IContainer {
  isTrue: boolean;
}

const Container = styled.div<IContainer>`
  width: 100%;
  height: 80px;
  background-color: red;
  position: fixed;
  padding: 0px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 680px) {
    position: absolute;
    width: 280px;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    transition: 0.4s ease-in-out;
    left: ${(props) => (props.isTrue ? "-280px" : "0px")};
  }
`;

const Item = styled.div`
  width: 200px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 680px) {
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 30px;
  }
  button {
    border-radius: 0.6rem;
    background-color: inherit;
    border: none;
    cursor: pointer;
    @media screen and (max-width: 680px) {
      margin-right: 12px;
      margin-left: 12px;
    }
  }
`;
const ResizeBtn = styled.div`
  width: 40px;
  height: 40px;
  background-color: green;
  position: absolute;
  left: 100%;
  cursor: pointer;
`;
