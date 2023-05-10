import React, { useState } from "react";
import styled from "styled-components";
import List from "./List";
import { useForm } from "react-hook-form";

const Upload = () => {
  const [list, setList] = useState<number[]>([]);
  const [content, setContent] = useState<{ title: string; payload: string }[]>([
    { title: "", payload: "" },
  ]);

  const addList = () => {
    if (list.length === 5) alert("문항은 6개까지만 입니다.");
    else {
      setList((prev) => {
        if (prev.length === 0) {
          return [0];
        }
        return [...prev, prev[prev.length - 1] + 1];
      });
    }
    setContent((prev) => {
      return [...prev, { title: "", payload: "" }];
    });
  };
  //버그가있어서 default box를 없애야할듯.
  //버그는 인덱스가안맞아서 화면에서 에러가남.
  //예를들어 list =[0,1,2,3,4]
  //content = [1,2,3,4,5]이다그래서 변경해야한다
  const handlePayload = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value !== null) {
      setContent((prev) => {
        const firstItem = prev[0];
        if (!firstItem) {
          return prev;
        }
        return [
          {
            ...firstItem,
            payload: value,
          },
          ...prev.slice(1),
        ];
      });
    }
  };
  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value !== null) {
      setContent((prev) => {
        const firstItem = prev[0];
        if (!firstItem) {
          return prev;
        }
        return [
          {
            ...firstItem,
            title: value,
          },
          ...prev.slice(1),
        ];
      });
    }
  };

  const save = () => {
    alert("저장되었습니다.");
  };
  return (
    <Container>
      <H1Input placeholder="회사이름을 입력해주세요." />
      <DefaultContent>
        <Item>
          <div>
            <span>질문:</span>
            <input
              value={content[0].title}
              onChange={handleTitle}
              placeholder="질문을 입력해주세요."
            />
          </div>
          <div>
            <SaveBtn onClick={save}>save</SaveBtn>
            <AddBtn onClick={addList}>+</AddBtn>
          </div>
        </Item>
        <Textarea
          value={content[0].payload}
          onChange={handlePayload}
        ></Textarea>
        {list.map((i) => (
          <List
            content={content}
            setContent={setContent}
            key={i}
            id={i}
            setList={setList}
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
