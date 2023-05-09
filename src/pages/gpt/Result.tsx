import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { IResult } from "./type";

const Result = ({ isResult, setIsResult }: IResult) => {
  const copy = () => {
    const text = isResult?.choices[0].message.content;
    if (text) {
      navigator.clipboard.writeText(text);
      alert("복사되었습니다.");
    }
  };
  return (
    <AnimatePresence>
      {isResult !== undefined && (
        <Overlay>
          <ResultBox>
            <XBtn onClick={() => setIsResult(undefined)} />
            <CopyBtn onClick={copy} />
            <Description>{isResult?.choices[0].message.content}</Description>
          </ResultBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Result;

const Overlay = styled(motion.div)`
  position: absolute;
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultBox = styled.div`
  background-color: white;
  width: 60%;
  min-height: 580px;
  height: fit-content;
  border-radius: 1rem;
  padding: 20px 30px;
  position: relative;
`;
const XBtn = styled.div`
  position: absolute;
  background-color: red;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  top: -2.5%;
  right: 0%;
  cursor: pointer;
`;
const CopyBtn = styled.div`
  position: absolute;
  background-color: blue;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  top: -2.5%;
  right: 5.5%;
  cursor: pointer;
`;
const Description = styled.p`
  line-height: 30px;
  font-size: 0.8rem;
`;
