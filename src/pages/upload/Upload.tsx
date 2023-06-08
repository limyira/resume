import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./List";
import { useForm } from "react-hook-form";
import axios from "../../utils/token";
import { getItem } from "../../utils/session";
import { getCookie } from "../../utils/cooke";
import addBtn from "../../assets/addBtn.svg";
import saveBtn from "../../assets/saveBtn.svg";

interface IContent {
  id: number;
  title: string;
  payload: string;
  textLength: number;
}

const Upload = () => {
  const [content, setContent] = useState<IContent[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [page, setPage] = useState(0);
  const addList = () => {
    if (content.length === 5) alert("문항은 6개까지만 입니다.");
    else {
      setContent((prev) => {
        const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 0;
        return [...prev, { id: newId, title: "", payload: "", textLength: 0 }];
      });
    }
  };
  const validation = (content: IContent[]) => {
    let isValidation = true;
    if (content.length === 0) return false;
    for (let i = 0; i < content.length; i++) {
      if (content[i].payload === "" || content[i].title === "")
        isValidation = false;
    }
    return isValidation;
  };
  const save = async () => {
    const _id = getItem("_id");
    if (validation(content) && companyName !== "") {
      const res = await axios.post("http://localhost:8080/api/upload", {
        _id,
        companyName,
        content,
      });
      alert("저장되었습니다.");
    } else {
      alert("빈공간이있으면안됩니다.");
    }
  };

  return (
    <Container>
      <Nav>
        <H1Input
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCompanyName(e.currentTarget.value)
          }
          value={companyName}
          required={true}
          placeholder="회사이름을 입력해주세요."
        />
        <SaveBtn src={saveBtn} onClick={save}></SaveBtn>
        <AddBtn src={addBtn} onClick={addList}></AddBtn>
      </Nav>
      <Pages>
        {content.map((i) => (
          <Page page={page} idx={i.id} onClick={() => setPage(i.id)}>
            {i.id + 1}
          </Page>
        ))}
      </Pages>
      <DefaultContent>
        {content.length === 0 && (
          <Span>+를 눌러서 자기소개서 항목을추가하세요</Span>
        )}
        {content.map(
          (v, i) =>
            v.id === page && (
              <List
                content={content}
                setContent={setContent}
                key={v.id}
                id={v.id}
              />
            )
        )}
      </DefaultContent>
    </Container>
  );
};

export default Upload;

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  @media screen and (max-width: 480px) {
    margin-top: 140px;
    padding: 0px 10px;
  }
`;

const DefaultContent = styled.div`
  width: 800px;
  height: fit-content;
  padding: 20px 30px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px #d8d8d8;
  background-color: white;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  margin-bottom: 20px;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: start;
  }
`;

const AddBtn = styled.img`
  width: 33px;
  height: 33px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 0%;
  @media screen and (max-width: 480px) {
    right: 2%;
    font-size: 0.8rem;
  }
`;

const H1Input = styled.input`
  border: none;
  border-bottom: 1px solid #afd082;
  padding: 10px 20px;
  width: 240px;
  outline: none;
  text-align: center;
  @media screen and (max-width: 480px) {
    width: 200px;
  }
`;

const SaveBtn = styled.img`
  width: 80px;
  height: 60px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 40px;
  position: absolute;
  right: 4%;
  @media screen and (max-width: 480px) {
    right: 10%;
    font-size: 0.8rem;
  }
`;

const Pages = styled.div`
  display: flex;
  width: 800px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

interface IPageProps {
  idx: number;
  page: number;
}

const Page = styled.div<IPageProps>`
  cursor: pointer;
  width: 20px;
  background-color: ${(props) =>
    props.page === props.idx ? "#afd082" : "white"};
  box-shadow: 0px 0px 5px #d8d8d8;
  margin-right: 5px;
  color: ${(props) => (props.page === props.idx ? "white" : "#afd082")};
  font-size: 16px;
  text-align: center;
  transition: 0.2s ease-in-out;
`;

const Span = styled.span`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
