import axios from "axios";
const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";

export const getData = async (prompt: string) => {
  const res = await axios.post(
    apiUrl,
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};
