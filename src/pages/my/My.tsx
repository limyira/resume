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
      <PostWrapper>
        <Contents lists={lists} />
      </PostWrapper>
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
`;

const PostWrapper = styled.div`
  margin: 0 auto;
  margin-top: 180px;

  box-sizing: inherit;
`;
