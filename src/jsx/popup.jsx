import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/popup.css";
import Slider from "./Slider";
import Main from "./main";

function PopUp() {
    const [username, setUsername] = useState("사용자"); // 기본값 설정

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
            setUsername(storedName);
        }
    }, []);

    return (
        <div className="pop-container">
            <div className="pop-up-header">
                <h1>{username}님, 반갑습니다!<br />
                    선호하는 주차환경을<br />선택해주세요.</h1>
            </div>

            <div className="pop-up-text">
                <h2>선택된 선호도에 따라<br />
                    PACO가 사용자님 맞춤 주차 공간을<br />추천해줄게요</h2>
            </div>

            <div className="recommend-container">
                <Slider />
            </div>

            <div className="skip-container">
                <Link to="/Main">Skip</Link>
            </div>
        </div>
    );
}

export default PopUp;
