import React from "react";
import styled from "styled-components";

interface IProps {
  id: number;
  setList: React.Dispatch<React.SetStateAction<number[]>>;
  content: { title: string; payload: string }[];
  setContent: React.Dispatch<
    React.SetStateAction<{ title: string; payload: string }[]>
  >;
}

const List = ({ id, setList, setContent, content }: IProps) => {
  const deleteItem = () => {
    setList((prev) => prev.filter((v) => v !== id));
    setContent((prev) => {
      const result = [];
      for (let i = 0; i < prev.length; i++) {
        if (i === id) {
          continue;
        }
        result.push(prev[i]);
      }
      return result;
    });
  };

  //warning input값에 undefined가나오는데 이러면 추후에
  //에러가 발생할수있음 해결방법 고민해보자

  const handlePayload = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setContent((prev) => {
      const newContent = [...prev];
      newContent[id] = {
        ...newContent[id],
        payload: value,
      };
      return newContent;
    });
  };

  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setContent((prev) => {
      const newContent = [...prev];
      newContent[id] = {
        ...newContent[id],
        title: value,
      };
      return newContent;
    });
  };
  return (
    <>
      <Item>
        <div>
          <span>질문:</span>
          <input
            value={content[id]?.title}
            onChange={handleTitle}
            placeholder="질문을 입력해주세요."
          />
        </div>
        <DeleteBtn onClick={deleteItem}>X</DeleteBtn>
      </Item>
      <Textarea
        value={content[id]?.payload}
        onChange={handlePayload}
      ></Textarea>
    </>
  );
};

export default List;

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
const DeleteBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
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
