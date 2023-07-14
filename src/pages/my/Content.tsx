import styled from "styled-components";
import Categorys from "./Categorys";
import { IContent } from "./My";
import { useNavigate } from "react-router-dom";

interface IProps {
  lists: {
    content: IContent[];
    createdAt: string;
    name: string;
    _id: string;
  }[];
}

const Contents = ({ lists }: IProps) => {
  const nav = useNavigate();
  return (
    <Container>
      {lists?.map((listItem) => {
        return (
          <Content
            onClick={() => nav(`/my/${listItem._id}`)}
            key={listItem.name}
          >
            <ContentDetail>
              <H1>{listItem.name}</H1>
              <Categorys key={listItem.createdAt} listItem={listItem} />
            </ContentDetail>
          </Content>
        );
      })}
    </Container>
  );
};
export default Contents;
const Container = styled.ul`
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  box-sizing: inherit;
  gap: 20px;
  @media screen and (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
  @media screen and (max-width: 1440px) {
    width: 1024px;
  }
  @media screen and (max-width: 1919px) {
    width: 1376px;
  }
`;
const H1 = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Content = styled.li`
  width: 20rem;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  border-radius: 14px;
  box-sizing: inherit;
  cursor: pointer;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  :hover {
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 1056px) {
    width: calc(50% - 2rem);
  }
  @media screen and (max-width: 1312px) {
    width: calc(33% - 1.8125rem);
  }
  @media screen and (max-width: 1440px) {
    width: calc(25% - 2rem);
  }
`;
const ContentDetail = styled.div``;
