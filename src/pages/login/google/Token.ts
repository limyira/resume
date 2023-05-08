import axios, { AxiosResponse } from "axios";
export const requestToken = async (token: string) => {
  const res: AxiosResponse = await axios.post(
    "http://localhost:8080/api/oauth/google",
    {
      token,
    }
  );
  return res.data;
};
