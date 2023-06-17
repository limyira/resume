import axios, { AxiosResponse } from "axios";
export const requestToken = async (token: string) => {
  console.log(token);
  const res: AxiosResponse = await axios.post(
    "https://resume-api.com/api/oauth/google",
    {
      token,
    }
  );
  return res.data;
};
