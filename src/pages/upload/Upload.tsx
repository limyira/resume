import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./List";
import { useForm } from "react-hook-form";
import axios from "../../utils/token";
import { getItem } from "../../utils/session";
import { getCookie } from "../../utils/cooke";

interface IContent {
  id: number;
  title: string;
  payload: string;
}

const Upload = () => {
  const [content, setContent] = useState<IContent[]>([]);
  const [companyName, setCompanyName] = useState<string>("");

  const addList = () => {
    if (content.length === 5) alert("문항은 6개까지만 입니다.");
    else {
      setContent((prev) => {
        const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 0;
        return [...prev, { id: newId, title: "", payload: "" }];
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
      <div>
        <H1Input
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCompanyName(e.currentTarget.value)
          }
          value={companyName}
          required={true}
          placeholder="회사이름을 입력해주세요."
        />
        <SaveBtn onClick={save}>save</SaveBtn>
        <AddBtn onClick={addList}>+</AddBtn>
        <div></div>
      </div>
      <DefaultContent>
        {content.length === 0 && (
          <span>+를 눌러서 자기소개서 항목을추가하세요</span>
        )}
        {content.map((v, i) => (
          <List
            content={content}
            setContent={setContent}
            key={v.id}
            id={v.id}
          ></List>
        ))}
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
`;

const DefaultContent = styled.div`
  width: 600px;
  height: fit-content;
  padding: 20px 30px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`;

const AddBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
const Item = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  span {
    margin-right: 15px;
  }
  input {
    padding: 4px 10px;
    border-radius: 12px;
    outline: none;
    border: none;
    width: 240px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 10px 12px;
  border-radius: 12px;
  outline: none;
  height: 200px;
  margin-bottom: 50px;
`;

const H1Input = styled.input`
  border: none;
  border-bottom: 1px solid #afd082;
  padding: 10px 20px;
  margin-bottom: 20px;
  width: 240px;
  outline: none;
  margin-top: 120px;
  text-align: center;
`;

const SaveBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
`;
