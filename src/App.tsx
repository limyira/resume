import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Nav from "./components/Nav";
import Token from "./pages/login/kakao/token";
import My from "./pages/my/My";
import Gpt from "./pages/gpt/Gpt";
import Upload from "./pages/upload/Upload";
import { getItem } from "./utils/session";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const _id = getItem("_id");
    if (_id) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <>
      <BrowserRouter>
        <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route
            path="/"
            element={<Main isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/my/oauth/kakao" element={<Token />} />
          <Route path="/my" element={<My />} />
          <Route path="/gpt" element={<Gpt />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
