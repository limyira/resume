import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Nav from "./components/Nav";
import Token from "./pages/login/kakao/token";
function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/my/oauth/kakao" element={<Token />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
