import React from "react";
import {Link ,useNavigate } from "react-router-dom";
import openingImage from "../img/opening.png";
import "../css/opening.css";

function Opening() {
    const navigate = useNavigate(); // ✅ useNavigate() 사용

    return (
        <div className="opening" style={{ backgroundColor: "#efefef" }}>
            <div 
                className="opening-container" 
                style={{ maxWidth: "430px", backgroundColor: "white", width: "100%" }}
            >
                <div className="opening-header">
                    <h1>PACO를 이용해<br />편리하고 즐거운 이동하세요</h1>
                </div>

                <div className="opening-picture">
                    <img src={openingImage} alt="오프닝" />
                </div>

                <div className="opening-login-container">
                    {/* ✅ 로그인 버튼 클릭 시 "/loginpage"로 이동 */}
                    <button className="opening-login" onClick={() => navigate("/jsx/login")}>
                        로그인
                    </button>
                    {/* ✅ 회원가입 버튼 클릭 시 "/signup"으로 이동 */}
                    <button className="opening-signup" onClick={() => navigate("/jsx/signup")}>
                        회원가입
                    </button>

                    <div className="opening-find-container"> 
                        <Link to="/jsx/find_id">ID찾기</Link> /  
                        {/* ✅ 비밀번호 찾기 클릭 시 "/find_pw"로 이동 */}
                        <Link to="/jsx/find_pw">비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Opening;
