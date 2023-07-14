import styled from "styled-components";
import React from "react";
import { IContent } from "./My";

interface IProps {
  listItem: {
    id?: string;
    name: string;
    content: IContent[];
    createdAt: string;
  };
}

const Categorys = ({ listItem }: IProps) => {
  return (
    <>
      {listItem.content.map((detail) => {
        return (
          <CategoryWrapper key={detail._id}>
            <Category>
              <Title>질문: {detail.title}</Title>
              <Payload>내용: {detail.payload}</Payload>
            </Category>
          </CategoryWrapper>
        );
      })}
    </>
  );
};

export default Categorys;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-sizing: inherit;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 12px;
  margin-top: 12px;
  font-size: 12px;
`;
const Payload = styled.div`
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
`;
