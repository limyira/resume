import React, { useEffect, useState } from "react";
import axios from "../../utils/token";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import Contents from "./Content";
export interface IContent {
  id: number;
  title: string;
  payload: string;
  _id: string;
}

export interface IList {
  content: IContent[];
  createdAt: string;
  name: string;
  _id: string;
}
const My = () => {
  const [lists, setList] = useState<IList[]>([]);
  const getData = async () => {
    const res: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/posts`
    );
    setList(res.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <InnerContainer>
        <PostWrapper>
          <Contents lists={lists} />
        </PostWrapper>
      </InnerContainer>
    </Container>
  );
};

export default My;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: inherit;
`;
const InnerContainer = styled.div`
  width: 1728px;
  margin: 0 auto;
  margin-top: 180px;

  @media screen and (max-width: 1919px) {
    width: 1376px;
  }
  @media screen and (max-width: 1440px) {
    width: 1024px;
  }
  @media screen and (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`;

const PostWrapper = styled.div`
  display: block;
  box-sizing: inherit;
`;
