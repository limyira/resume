import axios from "axios";

export const getData = async (prompt: string) => {
  console.log(prompt);
  console.log(process.env.REACT_APP_GPT_API_KEY);
  const res = await axios.post(
    `${process.env.REACT_APP_GPT_URL}`,
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(process.env.REACT_APP_GPT_API_KEY);
  return res;
};
