
import "../css/mypage.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import userInfoIcon from "../img/main/user_info.svg";
import parkingHistoryIcon from "../img/main/parking_history.svg";
import locationIcon from "../img/main/location.svg";

function Mypage(){
    const [username, setUsername] = useState("사용자");
    const [carNumber,setCarNumber] = useState("00호 0000");
    useEffect(() => {

        const storedName = localStorage.getItem("username");
        if (storedName) {
            setUsername(storedName);
        }

        const storedCarNumber = localStorage.getItem("carNumber");
        if (storedCarNumber){
            setCarNumber(storedCarNumber);
        }
    },[]);
    return(
         <div className="mypage-container">
            <div className="mypage-info=container">
                <button className="user-info-change">내 정보 수정</button>

                <div className="user-info-container">
                    <img src={userInfoIcon} alt="내 정보 수정" className="category-icon" />
                    <h1>{username}님</h1>
                    <h2>{carNumber ? `차량번호 ${carNumber}` : "등록된 차량이 없습니다"}</h2>
                </div> 
 
            </div>         

            <div className="parking-info-container">
                <div className="parking-history-wrapper">
                    <Link to="/ history" className="category-item">
                        <img src={parkingHistoryIcon} alt="주차 이력" className="category-icon" />
                        <h3>주차이력</h3>
                    </Link>
                </div>

                <div className="parking-location-wrapper">
                    <Link to="/location" className="category-item">
                        <img src={locationIcon} alt="내 차량 위치" className="category-icon" />
                        <h3>내 차량 위치</h3>
                    </Link>
                </div>
            </div>
         </div>         

    );
}

export default Mypage;