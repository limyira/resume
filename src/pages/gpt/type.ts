import { Dispatch, SetStateAction } from "react";

export interface IChoices {
  finish_reason: string;
  index: number;
  message: {
    content: string;
  };
}
export interface IIsResult {
  choices: IChoices[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}

export interface IResult {
  isResult: IIsResult | undefined;
  setIsResult: Dispatch<SetStateAction<IIsResult | undefined>>;
}

export interface IPramas {
  params: {
    company_name: string;
    depart: string;
    length: string;
    qes: string;
    text: string | undefined;
    user_name: string;
  };
}
