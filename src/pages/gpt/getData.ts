import axios from "axios";

export const getData = async (prompt: string) => {
  try {
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

    return res;
  } catch (err) {
    console.log(err);
  }
};
