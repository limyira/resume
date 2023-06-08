import React from "react";
import styled from "styled-components";
import deleteBtn from "../../assets/deleteBtn.svg";
interface IProps {
  id: number;
  content: { id: number; title: string; payload: string }[];
  setContent: React.Dispatch<
    React.SetStateAction<{ id: number; title: string; payload: string }[]>
  >;
  edit: boolean;
}

const DetailList = ({ id, setContent, content, edit }: IProps) => {
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
            required={true}
            onChange={handleTitle}
            placeholder="질문을 입력해주세요."
            disabled={!edit}
          />
        </div>
        <DeleteBtn src={deleteBtn} edit={edit} onClick={() => deleteItem(id)} />
      </Item>
      <Hr />
      <Textarea
        value={content[id]?.payload}
        onChange={handlePayload}
        required={true}
        disabled={!edit}
      ></Textarea>
    </>
  );
};

export default DetailList;

interface IEdit {
  edit: boolean;
}

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
const Hr = styled.hr`
  border: none;
  border-top: 1px dashed #bbb;
  height: 1px;
  margin-bottom: 20px;
`;

const DeleteBtn = styled.img<IEdit>`
  display: ${(props) => (props.edit ? "block" : "none")};
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

const CountSpan = styled.span`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
