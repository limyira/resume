import { IPramas } from "./type";

const generateText = ({ params }: IPramas) => {
  if (params.text === undefined) {
    return `자기소개서 작성려고하는데, 도와줘
        내이름은 ${params.user_name} 이고,
        지원하는 회사는 ${params.company_name} 에 
        ${params.depart} 부서에 자기소개서를 작성할꺼야
        자기소개서 문항은 ${params.qes} 이건데 공백 포함
        ${params.length} 글자 이내로 작성 예시좀 보여줘.
        `;
  } else {
    return `자기소개서 작성려고하는데, 도와줘
        내이름은 ${params.user_name} 이고,
        지원하는 회사는 ${params.company_name} 에 
        ${params.depart} 부서에 자기소개서를 작성할꺼야
        자기소개서 문항은 ${params.qes} 이건데 
        ${params.text} 내용을 넣어서 공백 포함
         ${params.length} 글자 이내로 작성 예시좀 보여줘.
        `;
  }
};

export default generateText;
