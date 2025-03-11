import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import LoginPage from "./loginpage";  // ✅ 로그인 페이지 직접 가져오기
//import Pop from "./Pop";
import App from "./App";
//import Opening from "./jsx/opening"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            {/* ✅ 앱 실행 시 `LoginPage`가 첫 화면으로 로드됨 */}
            <Route path="/" element={<App />} />  {/* 🔥 첫 페이지를 로그인 페이지로 설정 */}
            
        </Routes>
    </Router>
);
