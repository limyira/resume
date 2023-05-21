import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../utils/token";
import DetailList from "./DetailList";
import { getItem } from "../../utils/session";
import { useNavigate, useParams } from "react-router-dom";
import addBtn from "../../assets/addBtn.svg";
import saveBtn from "../../assets/saveBtn.svg";
interface IContent {
  id: number;
  title: string;
  payload: string;
}

const Detail = () => {
  const [content, setContent] = useState<IContent[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const postId = useParams().id;
  const nav = useNavigate();
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
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/edit/${postId}`,
        {
          companyName,
          content,
        }
      );
      alert("저장되었습니다.");
      nav(-1);
    } else {
      alert("빈공간이있으면안됩니다.");
    }
  };
  const initial = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`
    );
    setCompanyName(res.data.name);
    setContent(res.data.content);
  };
  useEffect(() => {
    initial();
  }, []);

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
        <SaveBtn src={saveBtn} edit={edit} onClick={save}></SaveBtn>
        <AddBtn src={addBtn} edit={edit} onClick={addList}></AddBtn>
        <EditBtn edit={edit} onClick={() => setEdit((prev) => !prev)}>
          edit
        </EditBtn>
      </Nav>
      <DefaultContent>
        {content.length === 0 && (
          <span>+를 눌러서 자기소개서 항목을추가하세요</span>
        )}
        {content.map((v, i) => (
          <DetailList
            content={content}
            setContent={setContent}
            key={v.id}
            id={v.id}
            edit={edit}
          ></DetailList>
        ))}
      </DefaultContent>
    </Container>
  );
};

export default Detail;

interface IEdit {
  edit: boolean;
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  margin-bottom: 20px;
  justify-content: center;
  position: relative;
`;

const DefaultContent = styled.div`
  width: 600px;
  height: fit-content;
  padding: 20px 30px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
  background-color: white;
`;

const EditBtn = styled.button<IEdit>`
  display: ${(props) => (props.edit ? "none" : "block")};
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 0%;
`;

const AddBtn = styled.img<IEdit>`
  display: ${(props) => (props.edit ? "block" : "none")};
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: absolute;
  right: 0%;
`;

const H1Input = styled.input`
  border: none;
  border-bottom: 1px solid #afd082;
  padding: 10px 20px;
  width: 240px;
  outline: none;
  text-align: center;
`;

const SaveBtn = styled.img<IEdit>`
  display: ${(props) => (props.edit ? "block" : "none")};
  width: 80px;
  height: 60px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 40px;
  position: absolute;
  right: 8%;
`;
