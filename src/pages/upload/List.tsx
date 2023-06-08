import React from "react";
import styled from "styled-components";
import deleteBtn from "../../assets/deleteBtn.svg";

interface IProps {
  id: number;
  content: { id: number; title: string; payload: string; textLength: number }[];
  setContent: React.Dispatch<
    React.SetStateAction<
      { id: number; title: string; payload: string; textLength: number }[]
    >
  >;
}

const List = ({ id, setContent, content }: IProps) => {
  const deleteItem = (id: number) => {
    setContent((prev) => {
      const newContent = prev.filter((item) => item.id !== id);
      const updatedContent = newContent.map((item, index) => {
        return { ...item, id: index };
      });
      return updatedContent;
    });
  };

  const handlePayload = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    // 스페이스바와 엔터의 연속된 입력을 여러 번으로 처리
    setContent((prev) => {
      const newContent = [...prev];
      newContent[id] = {
        ...newContent[id],
        payload: value,
        textLength: value.length,
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
  const handleTextAreaSelect = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value === "") {
      setContent((prev) => {
        const newContent = [...prev];
        newContent[id] = {
          ...newContent[id],
          payload: "",
          textLength: 0,
        };
        return newContent;
      });
    }
  };
  return (
    <>
      <Item>
        <div>
          <span>질문:</span>
          <input
            value={content[id]?.title}
            required={true}
            onChange={handleTitle}
            placeholder="질문을 입력해주세요."
          />
        </div>
        <DeleteBtn src={deleteBtn} onClick={() => deleteItem(id)}></DeleteBtn>
      </Item>
      <Hr />
      <Textarea
        value={content[id]?.payload}
        onChange={handlePayload}
        onSelect={handleTextAreaSelect}
        required={true}
        placeholder="답변을 입력하세요."
      ></Textarea>
      <CountSpan>글자수 : {content[id]?.textLength} </CountSpan>
    </>
  );
};

export default List;

const Item = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  margin-bottom: 40px;
  justify-content: space-between;
  span {
    margin-right: 15px;
    @media screen and (max-width: 480px) {
      margin-right: 8px;
    }
  }
  input {
    padding: 4px 10px;
    outline: none;
    border: none;
    width: 500px;
    @media screen and (max-width: 480px) {
      width: 200px;
    }
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;
const DeleteBtn = styled.img`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 12px;
  outline: none;
  height: 500px;
  border: none;
  margin-bottom: 20px;
  @media screen and (max-width: 480px) {
    height: 400px;
  }
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px dashed #bbb;
  height: 1px;
  margin-bottom: 20px;
`;

const CountSpan = styled.span`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
