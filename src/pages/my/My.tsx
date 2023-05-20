import React from "react";
import axios from "../../utils/token";

const My = () => {
  const getDate = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/mypost`
    );
    console.log(res);
  };
  getDate();
  return <h1>My</h1>;
};

export default My;
